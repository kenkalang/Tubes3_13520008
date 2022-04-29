package handlers

import (
	"math"
)

func GetLastOccurrence(pattern string) [128]int {
	var lastOccurrence [128]int
	for i := 0; i < 128; i++ {
		lastOccurrence[i] = -1
	}
	for i := 0; i < len(pattern); i++ {
		lastOccurrence[pattern[i]] = i
	}
	return lastOccurrence
}

func BooyerMoore(pattern string, text string) bool {
	lastOccurrence := GetLastOccurrence(pattern)
	n := len(text)
	m := len(pattern)
	if m > n {
		return false
	}
	i := m - 1
	j := m - 1
	for i <= n-1 {
		if text[i] == pattern[j] {
			if j == 0 {
				return true
			}
			i--
			j--
		} else {
			last := lastOccurrence[text[i]]
			min := math.Min(float64(j), float64(1+last))
			i = i + m - int(min)
			j = m - 1
		}
	}
	return false
}
