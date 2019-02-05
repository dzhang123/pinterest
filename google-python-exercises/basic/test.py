import re

def main():
    str = 'purple alice@google.com, blah monkey bob@abc.-com blah dishwasher'
    tuples = re.findall(r'([\w\.-]+)@([\w\.-]+)', str)
    print tuples  ## [('alice', 'google.com'), ('bob', 'abc.com')]
    for tuple in tuples:
        print tuple[0]  ## username
        print tuple[1]  ## host

if __name__ == '__main__':
    main()