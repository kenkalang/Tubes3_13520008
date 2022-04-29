package handlers

func BorderFunction(pattern string, M int, fail []int) {
	len := 0
	k := 1
	fail[0] = 0

	for k < M {
		if pattern[k] == pattern[len] {
			len++
			fail[k] = len
			k++
		} else {
			if len != 0 {
				len = fail[len-1]
			} else {
				fail[k] = 0
				k++
			}
		}
	}
}

func KMP(pattern string, text string) int { //Return -1 if pattern doesn't exists in text else index where pattern start
	n := len(text)
	m := len(pattern)

	//borderFunction
	var fail [128]int
	BorderFunction(pattern, m, fail[:])

	i := 0
	j := 0
	//Looping
	for i < n {
		if pattern[j] == text[i] {
			if j == m-1 {
				return i - m + 1
			}
			i++
			j++
		} else if j > 0 {
			j = fail[j-1]
		} else {
			i++
		}
	}
	return -1
}