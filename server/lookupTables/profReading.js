/* Proficient Reading Lookup Tables from easyCBM Detailed Percentile PDF */

/*     |_______|_______Percentile______|
       | Score | Fall | Winter | Spring|
*/

const profReadingLookup = {
       2: [
              [0, 1, 0, 0],
              [1, 2, 1, 1],
              [2, 6, 3, 3],
              [3, 14, 8, 6],
              [4, 25, 15, 12],
              [5, 38, 23, 18],
              [6, 50, 30, 25],
              [7, 61, 39, 31],
              [8, 72, 49, 39],
              [9, 82, 62, 51],
              [10, 92, 77, 68],
              [11, 98, 92, 86],
              [12, 99, 99, 99]
       ],
       3: [
              [0, 0, 0, 0],
              [1, 0, 0, 0],
              [2, 1, 0, 0],
              [3, 2, 1, 1],
              [4, 5, 3, 2],
              [5, 11, 6, 4],
              [6, 18, 13, 8],
              [7, 25, 21, 12],
              [8, 33, 30, 17],
              [9, 41, 39, 22],
              [10, 49, 50, 27],
              [11, 57, 63, 34],
              [12, 63, 73, 41],
              [13, 73, 83, 48],
              [14, 81, 91, 58],
              [15, 89, 97, 67],
              [16, 95, 99, 77],
              [17, 98, 99, 85],
              [18, 99, 99, 93],
              [19, 99, , 98],      // null value
              [20, 99, , 99]       // null value
       ],
       4: [
              [0, 0, 0, 0],
              [1, 0, 0, 0],
              [2, 0, 0, 0],
              [3, 2, 1, 1],
              [4, 4, 2, 3],
              [5, 7, 4, 5],
              [6, 12, 8, 10],
              [7, 19, 12, 14],
              [8, 26, 18, 19],
              [9, 33, 23, 26],
              [10, 42, 29, 32],
              [11, 49, 36, 38],
              [12, 56, 44, 46],
              [13, 63, 52, 53],
              [14, 71, 59, 60],
              [15, 78, 69, 70],
              [16, 85, 80, 81],
              [17, 92, 89, 90],
              [18, 97, 96, 96],
              [19, 99, 99, 99],
              [20, 99, 99, 99]
       ],
       5: [
              [0, 0, 0, 0],
              [1, 0, 0, 0],
              [2, 0, 0, 0],
              [3, 0, 1, 0],
              [4, 1, 2, 2],
              [5, 3, 2, 3],
              [6, 6, 4, 5],
              [7, 9, 5, 8],
              [8, 13, 8, 12],
              [9, 18, 11, 15],
              [10, 23, 14, 19],
              [11, 29, 18, 24],
              [12, 36, 22, 29],
              [13, 44, 28, 36],
              [14, 56, 34, 47],
              [15, 70, 44, 61],
              [16, 83, 56, 77],
              [17, 93, 69, 91],
              [18, 98, 83, 98],
              [19, 99, 95, 99],
              [20, 99, 99, 99]
       ],
       6: [
              [0, 0, 2, 1],
              [1, 0, 2, 1],
              [2, 1, 2, 1],
              [3, 1, 2, 2],
              [4, 2, 3, 2],
              [5, 4, 5, 4],
              [6, 6, 8, 8],
              [7, 9, 10, 11],
              [8, 12, 15, 15],
              [9, 16, 19, 22],
              [10, 21, 24, 26],
              [11, 27, 31, 30],
              [12, 36, 40, 38],
              [13, 45, 51, 47],
              [14, 56, 64, 57],
              [15, 69, 76, 71],
              [16, 82, 87, 81],
              [17, 93, 95, 91],
              [18, 98, 99, 96],
              [19, 99, 99, 99],
              [20, 99, 99, 99]
       ],
       7: [
              [0, 1, 2, 0],
              [1, 1, 2, 0],
              [2, 1, 2, 1],
              [3, 2, 3, 1],
              [4, 4, 4, 3],
              [5, 6, 7, 6],
              [6, 12, 10, 10],
              [7, 17, 16, 15],
              [8, 23, 20, 21],
              [9, 29, 25, 27],
              [10, 34, 29, 36],
              [11, 42, 33, 46],
              [12, 49, 40, 58],
              [13, 57, 47, 73],
              [14, 67, 58, 83],
              [15, 77, 70, 91],
              [16, 87, 84, 97],
              [17, 94, 94, 99],
              [18, 98, 99, 99],
              [19, 99, 99, 99],
              [20, 99, 99, 99]
       ],
       8: [
              [0, 0, 1, 1],
              [1, 0, 1, 1],
              [2, 0, 1, 1],
              [3, 1, 1, 2],
              [4, 2, 3, 3],
              [5, 5, 5, 6],
              [6, 8, 7, 11],
              [7, 12, 13, 17],
              [8, 18, 20, 21],
              [9, 24, 26, 28],
              [10, 31, 35, 33],
              [11, 37, 46, 41],
              [12, 44, 55, 50],
              [13, 53, 67, 61],
              [14, 64, 78, 71],
              [15, 76, 88, 84],
              [16, 85, 95, 92],
              [17, 93, 98, 97],
              [18, 98, 99, 99],
              [19, 99, 99, 99],
              [20, 99, , 99] // null value
       ]

}

export default profReadingLookup