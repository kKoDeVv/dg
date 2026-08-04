ascii = [chr(i) for i in range(32, 127)]
#for i in ascii:
#    print("   ", i, "in", ascii.index(i), "   ")

def enc():
    plainText = input("Enter text: ")
    plainKey = input("Enter key: ")

    numedText = []
    numedKey = []
    for f in plainText:
        numedText.append(ascii.index(f))
    for f in plainKey:
        numedKey.append(ascii.index(f))

    encNumedText = []
    lenNumedKey = len(numedKey)
    key = 0
    for i in numedText:
        if key == lenNumedKey:
            key = 0

        if i + numedKey[key] <= 94:
            encNumedText.append(i + numedKey[key])
        else:
            encNumedText.append(i + numedKey[key] - 94)
        key += 1
        
    encTextList = []
    for i in encNumedText:
        encTextList.append(ascii[i])

    encText = "".join(str(x) for x in encTextList)
    print("Encrypted text: " + encText)


def dec():
    encText = input("Enter text: ")
    encKey = input("Enter key: ")

    numedText = []
    numedKey = []
    for f in encText:
        numedText.append(ascii.index(f))
    for f in encKey:
        numedKey.append(ascii.index(f))

    decNumedText = []
    lenNumedKey = len(numedKey)
    key = 0
    for i in numedText:
        if key == lenNumedKey:
            key = 0

        if i - numedKey[key] >= 0:
            decNumedText.append(i - numedKey[key])
        else:
            decNumedText.append(i - numedKey[key] + 94)

        key += 1

    decTextList = []
    for i in decNumedText:
        decTextList.append(ascii[i])

    decText = "".join(str(x) for x in decTextList)
    print("Decrypted text: " + decText)



while 1:
    print("\n\n\n")
    print("0 - Encrypt.")
    print("1 - Decrypt.")
    print("\n")

    act = input("Choose action:")

    if act == "0":
        enc()
    elif act == "1":
        dec()
    else:
        print("Invalid action.")