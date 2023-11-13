package main

import (
	"fmt"
	"github.com/cakturk/go-netstat/netstat"
	"math/rand"
	"time"
)

const (
	protoIPv4 = 0x01
	protoIPv6 = 0x02
)

func main() {

	// var proto uint
	// proto = protoIPv4 | protoIPv6
	type void struct{}
	var empty void
	set := make(map[uint16]void)
	rand.Seed(time.Now().UnixNano())

	var fn netstat.AcceptFn
	fn = func(s *netstat.SockTabEntry) bool {
		return s.State == netstat.Listen
	}
	
	tabs, err := netstat.TCPSocks(fn)
	if err == nil {
		for _, tab := range tabs {
			set[tab.LocalAddr.Port] = empty
		}
	}
	var availablePort uint16
	for{
		availablePort = randomUint16(10000,20000)
		if _,ok := set[availablePort]; !ok{
			break
		}
	}
	fmt.Printf("%d\n",availablePort)
}

func randomUint16(min, max int) uint16 {
	num := min + rand.Intn(max-min)
	return uint16(num)

}
