import random
def get_random_number():
    return random.randint(1, 100)
if __name__ == "__main__":
    random_number = get_random_number()
    print(f"The random number generated is: {random_number}")   

if __name__ == "__main__":
    print("This code is executed when the script is run directly.")
def greet(name):
    return f"Hello, {name}!"
if __name__ == "__main__":
    name = "Alice"
    greeting = greet(name)
    print(greeting)

def calculate_area(radius):
    import math
    return math.pi * radius ** 2
if __name__ == "__main__":
        radius = 5
        area = calculate_area(radius)
        print(f"The area of the circle with radius {radius} is: {area}")