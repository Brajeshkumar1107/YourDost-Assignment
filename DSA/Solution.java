import java.util.*;

class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter the number of elements:");
        int n = sc.nextInt();
        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.println("Second largest element is: " + findSecondLargest(n, arr));
    }

    private static int findSecondLargest(int n, int[] arr) {
        int max = Integer.MIN_VALUE;
        int secMax = Integer.MIN_VALUE;

        for (int i = 0; i < n; i++) {
            if (arr[i] > max) {
                secMax = max;
                max = arr[i];
            }
            else if (arr[i] > secMax && arr[i] < max) {
                secMax = arr[i];
            }
        }
        return (secMax == Integer.MIN_VALUE) ? -1 : secMax;
    }
}