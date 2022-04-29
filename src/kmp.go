package handlers

import "fmt"

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
	//else return index where found pattern starts
	txtLen := len(text)
	ptrLen := len(pattern)

	//borderFunction
	var startIdx [128]int
	BorderFunction(pattern, ptrLen, startIdx[:])

	var similarities [128]int

	txtIdx := 0
	ptrIdx := 0
	ptrSmlIdx := 0
	//Looping
	for txtIdx < txtLen {
		GetSimilarities(pattern, text, ptrSmlIdx, txtIdx, similarities[:])
		if pattern[ptrIdx] == text[txtIdx] {
			if ptrIdx == ptrLen-1 {
				return findMaxSimilarities(similarities[:], similarities[0])
			}
			txtIdx++
			ptrIdx++
		} else if ptrIdx > 0 {
			ptrIdx = startIdx[ptrIdx-1]
		} else {
			txtIdx++
		}
	}
	return findMaxSimilarities(similarities[:], similarities[0])
}

func GetSimilarities(pattern string, text string, ptrSmlIdx int, txtIdx int, similarities []int) {
	txtLen := len(text)
	ptrLen := len(pattern)
	currSml := 0
	
	for txtIdx < txtIdx + ptrLen {
		if pattern[ptrSmlIdx] == text[txtIdx] {
			ptrSmlIdx++
			txtIdx++
			currSml++
		} else {
			ptrSmlIdx++
			txtIdx++
		}
	}
	similarities[txtIdx] = (currSml/ptrLen)*100
}

func findMaxSimilarities(similarities []int, max int) {
	for _, value := range similarities {
		if value > max {
			max = value
		}
	}
}