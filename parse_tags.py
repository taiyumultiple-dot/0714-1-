import re

with open('src/components/Unit01TextbookPageViewer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

line_starts = [0]
for m in re.finditer('\n', content):
    line_starts.append(m.end())

def get_line(offset):
    for i, start in enumerate(line_starts):
        if start > offset:
            return i
    return len(line_starts)

stack = []
tags_found = []

state = 'NORMAL'
idx = 0
while idx < len(content):
    if state == 'NORMAL':
        if content[idx:idx+2] == '//':
            state = 'COMMENT_LINE'
            idx += 1
        elif content[idx:idx+2] == '/*':
            state = 'COMMENT_BLOCK'
            idx += 1
        elif content[idx:idx+3] == '{/*':
            state = 'JSX_COMMENT'
            idx += 2
        elif content[idx] == "'":
            state = 'STRING_S'
        elif content[idx] == '"':
            state = 'STRING_D'
        elif content[idx] == '`':
            state = 'TEMPLATE'
        elif content[idx] == '<':
            match = re.match(r'^</?([a-zA-Z0-9_\.:]+)', content[idx:])
            if match:
                state = 'TAG'
                tag_start = idx
                tag_name = match.group(1)
                is_close = content[idx+1] == '/'
    elif state == 'COMMENT_LINE':
        if content[idx] == '\n':
            state = 'NORMAL'
    elif state == 'COMMENT_BLOCK':
        if content[idx:idx+2] == '*/':
            state = 'NORMAL'
            idx += 1
    elif state == 'JSX_COMMENT':
        if content[idx:idx+3] == '*/}':
            state = 'NORMAL'
            idx += 2
    elif state == 'STRING_S':
        if content[idx] == '\\':
            idx += 1
        elif content[idx] == "'":
            state = 'NORMAL'
    elif state == 'STRING_D':
        if content[idx] == '\\':
            idx += 1
        elif content[idx] == '"':
            state = 'NORMAL'
    elif state == 'TEMPLATE':
        if content[idx] == '\\':
            idx += 1
        elif content[idx] == '`':
            state = 'NORMAL'
    elif state == 'TAG':
        sub_idx = idx
        in_attr_str = None
        while sub_idx < len(content):
            char = content[sub_idx]
            if in_attr_str:
                if char == in_attr_str:
                    in_attr_str = None
            elif char in ['"', "'"]:
                in_attr_str = char
            elif char == '>':
                break
            sub_idx += 1
        
        tag_full = content[tag_start:sub_idx+1]
        is_self_closing = tag_full.endswith('/>') or tag_name.lower() in ['img', 'br', 'hr', 'input', 'link', 'meta']
        
        line_num = get_line(tag_start)
        tags_found.append((tag_name, is_close, is_self_closing, line_num, tag_full))
        
        idx = sub_idx
        state = 'NORMAL'
        
    idx += 1

for name, is_close, is_self_closing, line, tag_full in tags_found:
    if is_self_closing:
        continue
    if not is_close:
        stack.append((name, line, tag_full))
    else:
        if not stack:
            print(f'Line {line}: unmatched closing tag {tag_full}')
        else:
            prev_name, prev_line, prev_tag = stack[-1]
            if prev_name == name:
                stack.pop()
            else:
                matched = False
                for s_idx in range(len(stack)-1, -1, -1):
                    if stack[s_idx][0] == name:
                        print(f'Line {line}: closing </{name}> matched opening on line {stack[s_idx][1]}, but the following tags are left unclosed:')
                        for u_name, u_line, u_tag in stack[s_idx+1:]:
                            print(f'  Unclosed: <{u_name}> opened on line {u_line}')
                        stack = stack[:s_idx]
                        matched = True
                        break
                if not matched:
                    print(f'Line {line}: closing tag {tag_full} has no matching opening tag (top of stack was <{prev_name}> from line {prev_line})')
                    stack.pop()

if stack:
    print('Unclosed tags at end of file:')
    for u_name, u_line, u_tag in stack:
        print(f'  <{u_name}> on line {u_line}: {u_tag[:60]}...')
