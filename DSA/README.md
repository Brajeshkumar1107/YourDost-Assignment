# DSA Solution — Second Largest Unique Number

##  Problem Statement
Given an array of integers, return the **second largest unique** number.  
If it does not exist, return **-1**.

---

## Approach
- Use two variables: `max`, `secondMax`
- Traverse array once (O(n) time)
- Update values with:
  - if `arr[i] > max` → update both
  - else if `arr[i] > secondMax && arr[i] < max` → update secondMax
- Return `-1` if no second largest unique number found

---

##  How to Run
```bash
javac Solution.java
java Solution
