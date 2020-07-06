const HashMap = require('./HashMap')

function main(){
    const lotr = new HashMap()
    lotr.maxRatio = 0.5
    lotr.sizeRatio = 3

    lotr.set('Hobbit','Bilbo')
    lotr.set('Hobbit','Frodo')
    lotr.set('Wizard','Gandalf')
    lotr.set('Human','Aragon')
    lotr.set('Elf','Legolas')
    lotr.set('Maiar','The Necromancer')
    lotr.set('Maiar','Sauron')
    lotr.set('RingBearer','Gollum')
    lotr.set('LadyOfLight','Galadriel')
    lotr.set('HalfElven','Arwen')
    lotr.set('Ent','Treebeard')
}

main()

/*
2. WhatDoesThisDo
DO NOT run the following code before solving the problem.

What is the output of the following code? explain your answer.
*/

const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10); // map1.set('Hello World.' , 10)
    map1.set(str2,20); // map1.set('Hello World.) , 20
    let map2 = new HashMap();
    let str3 = str1; //'Hello World.'
    let str4 = str2; //'Hello World.'
    map2.set(str3,20); //map2.set('Hello World' , 20)
    map2.set(str4,10); //map2.set('Hello World' , 10)

    console.log(map1.get(str1)); //20
    console.log(map2.get(str3)); //10
}


/*
3. Demonstrate understanding of Hash maps
*You don't need to write code for the following two drills. use any drawing app or simple pen and paper *

1) Show your hash map after the insertion of keys 10, 22, 31, 4, 15, 28, 17, 88, 59 into a hash map of length 11 using open addressing and a hash function k mod m, where k is the key and m is the length.

https://docs.google.com/drawings/d/1MLJSSEk76rnHwj7yHPjRooCtzp0j5NJ12b27d9-RZG4/edit?usp=sharing

2) Show your hash map after the insertion of the keys 5, 28, 19, 15, 20, 33, 12, 17, 10 into the hash map with collisions resolved by separate chaining. Let the hash table have a length m = 9, and let the hash function be k mod m.

https://docs.google.com/drawings/d/1igiemboGw-jGMC2tKDkN3f53Ni2cgQ3Ik74W6cEDnLc/edit?usp=sharing

*/


/*
4. Remove duplicates
Implement a function to delete all duplicated characters in a string and keep only the first occurrence of each character. For example, if the input is string “google”, the result after deletion is “gole”. Test your program with a sentence as well such as "google all that you think can think of".
*/

function removeDupe(str){
    let record = new HashMap()
    let ansStr = ''
    for (let i = 0 ; i < str.length ; i++){
      if (!record.get(str[i])){
        ansStr = ansStr + str[i]
        record.set(str[i],1)
      } 
    }
  
    return ansStr
  }
  

/*
5. Any permutation a palindrome
Write an algorithm to check whether any anagram of some string is a palindrome. Given some string, "acecarr", the algorithm should return true, because the letters in "acecarr" can be rearranged to the anagram "racecar", which itself is a palindrome. In contrast, given the word "north", the algorithm should return false, because there's no anagram for "north" that would be a palindrome.
*/

function palindromeCheck(str){
    let record = new HashMap()
    let counter = 0
    for (let i = 0 ; i < str.length ; i++){
      if (!record.get(str[i])){
        record.set(str[i] , 1)
        counter++
      } else {
        let count = record.get(str[i]) + 1
        record.set(str[i], count)
        if (count % 2 == 0) counter--
        else counter++
      }
    }
    return counter <= 1
    /*
    let single = 0
    let pair = 0
    for (let j = 0 ; j < str.length ; j++){
      if (record.get(str[j]) % 2 === 1){
        single++
      } else if (record.get(str[j]) % 2 === 0){
        pair++
      }
    }
  
    if (single > 1){
      return false
    } else return true
    */
  }

/*
6. Anagram grouping
Write an algorithm to group a list of words into anagrams. For example, if the input was ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], the output should be: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']].
*/


function grouping(list){
    let ans = []
    let index = 0
    let hash = new HashMap()
      for (let i = 0; i < list.length; i++){
        key = list[i].split('').sort().join('')
        try{
          hash.get(key)
        }
        catch(err){
          ans[index] = []
          //[[]]
          hash.set(key, index)
          //aest:0
          index++
          //index = 1
        }
        ans[hash.get(key)].push(list[i])
        //[[east]]
      }
    return ans
  }


/*
7. Separate Chaining
Write another hash map implementation as above, but use separate chaining as the collision resolution mechanism.
Test your hash map with the same values from the lotr hash map.
*/