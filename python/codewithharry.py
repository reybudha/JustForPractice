import random
a = input("Enter a number: ")
b = random.randint(1, 100)
if a == b :
    print("You win")
else:
    print("You lose")

print("The number was : ", b)