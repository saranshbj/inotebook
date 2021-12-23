dict 1={}
list 1=["add","sub"]
l1=[]
l2=[]
list 2=[l1,l2]
num=int(input("enter the time of repetition"))
for i in range(0,num):
    c= int(input("1 for add(+)2 for subtract(-)"))
    a= int(input("enter the 1 number"))
    b= int(input("enter the 2 numbers"))
    if c=1:
        s=a+b
        l1.append(s)
        elif.c==2:
            s=a-b
            l2.append(s)
            else:
                print("wrong no entered")
                z=zip(list1,list2)
                dict1,update(z)
                print("\n output IN DICTIONARY")
                print(dict1)