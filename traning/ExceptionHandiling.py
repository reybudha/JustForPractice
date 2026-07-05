a = input("enter the first number for table of  : ")
#b = input("Enter the second number :")

for i in range(1 , 11):
    print(f" {a} * {i} =  {int(a)*int(i)} ")

a = input("Predict the first number  : ")
b = input("Predict the second number ")
try:
    if (a == 10 and b == 100):
        print("Ur number is correct that is", a , b)
    else:
        print ("Ur predection is wrong . The number is ", a , b)
except Exception as e:
    print(e)
    
print("Some imp lines od code ")
print("thank U")
