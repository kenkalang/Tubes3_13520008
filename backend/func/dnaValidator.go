package handlers

import "regexp"

func DNAValidator(dna string) bool {
	re := regexp.MustCompile(`^[ATCG]+$`)
	return re.MatchString(dna)
}
