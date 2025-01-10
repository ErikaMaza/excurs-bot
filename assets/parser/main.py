def main():
    a = int(input("Введите число: "))

    divisible_numbers = []
    for i in range(1, a + 1):
        if i % 3 == 0:
            divisible_numbers.append(i)

    print(f"Количество чисел, делящихся на 3: {len(divisible_numbers)}")
    print(f"Эти числа: {', '.join(map(str, divisible_numbers))}")

main()
