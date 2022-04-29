package handlers

func BorderFunction(pattern string, M int, startIdx []int) {
	len := 0
	k := 1
	startIdx[0] = 0

	for k < M {
		if pattern[k] == pattern[len] {
			len++
			startIdx[k] = len
			k++
		} else {
			if len != 0 {
				len = startIdx[len-1]
			} else {
				startIdx[k] = 0
				k++
			}
		}
	}
}

func KMP(pattern string, text string) int { \
	//Return -1 if pattern doesn't exists in text 
	//else index where pattern starts
	txtLen := len(text)
	ptrLen := len(pattern)

	//borderFunction
	var startIdx [128]int
	BorderFunction(pattern, m, startIdx[:])

	txtIdx := 0
	ptrIdx := 0
	//Looping
	for txtIdx < txtLen {
		if pattern[j] == text[txtIdx] {
			if ptrIdx == ptrLen-1 {
				return txtIdx - ptrLen + 1
			}
			i++
			j++
		} else if ptrIdx > 0 {
			ptrIdx = startIdx[j-1]
		} else {
			txtIdx++
		}
	}
	return -1
}