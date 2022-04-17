package vkapi

import (
	"fmt"
	"strconv"
	"strings"
)

func toString(i any) (string, error) {
	switch item := i.(type) {
	case string:
		return item, nil
	case int:
		return strconv.Itoa(item), nil
	case bool:
		return strconv.FormatBool(item), nil
	case []string:
		return strings.Join(item, ","), nil
	default:
		return "", fmt.Errorf("vkapi: unsupported type %T", item)
	}
}
