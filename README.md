# Web Engineer Pre-Test

## Task1
請嘗試實作rest api project，	說明如下：

1. 請在本機(local)的MySQL新建一個資料庫名為「company」，資料庫編碼為utf-8，並將company.sql內的資料及table匯入資料庫中。
2. 以node.js搭配express實作rest api project，連接MySQL內的company資料庫取得資料，api port設定為9988，回傳格式為JSON。
3. project內有兩支API，需求說明如下：
  ### 1. [GET] http://localhost:9988/staffs (回傳staff list)
   
     可傳入以下參數進行分頁及排序功能，未傳入參數則設定為預設值：
     + sortColumn -> 以哪個欄位排序 (order by，預設值staffNo)
     + order 		 ->  排序的順序 (asc or desc，預設值asc)
     + pageCount  ->  回傳資料筆數 (預設值5)
     + pageNumber ->  資料是第幾頁 (預設值1)(假設pageCount=5，pageNumber=1則回傳資料為第1-5筆)  
   
   ```
   範例：http://localhost:9988/staffs?sortColumn=salary&order=desc&pageCount=3&pageNumber=1
   回傳結果：
   [
	    {
	        "staffNo": 7,
	        "staffName": "Neil",
	        "gender": "M",
	        "birthday": "1991-09-04",
	        "deptId": "A",
	        "deptName": "業務發展部",
	        "status": 1,
	        "salary": 60000
	    },
	    {
	        "staffNo": 8,
	        "staffName": "Peter",
	        "gender": "M",
	        "birthday": "2001-02-04",
	        "deptId": "B",
	        "deptName": "數據科學部",
	        "status": 1,
	        "salary": 55000
	    },
	    	    {
	        "staffNo": 12,
	        "staffName": "Johnson",
	        "gender": "M",
	        "birthday": "1978-08-08",
	        "deptId": "B",
	        "deptName": "數據科學部",
	        "status": 1,
	        "salary": 53000
	    }
	]
   
   ```
  
  ### 2. [GET] http://localhost:9988/dept?staffNo=X(依傳入的員工編號回傳該員工所屬部門的資料)
   ```
   範例：http://localhost:9988/dept?staffNo=1
   回傳結果：
	    {
	        "id": "A",
	        "name": "業務發展部",
	        "location": "四樓"
	    }
   ```
 
## Task2
players.json內為nba球員名單，請以此份資料，搭配文件中的示意圖，以「React.js + ES6」實作一個球員名單查詢系統。

### 系統介面佈局
1. Header：左邊顯示LnData的logo(https://www.lndata.com/images/logo/logo_160.png)，右邊顯示Avatar示意圖
2. Menu選單：顯示「Player List」功能
3. Main Content：主畫面中有搜尋條件及表格兩個區塊，在搜尋條件中設定搜尋條件後送出，表格內會顯示相對應的資料。
![](https://i.imgur.com/vOp928r.png)

### 系統需求
1. 表格可排序，排序欄位如示意圖所示，預設以Points欄位排序，最高的在最前面，資料預設為顯示全部球員名單。
2. 表格需有分頁功能，每頁顯示15筆資料，顯示欄位如示意圖所示。
3. 搜尋條件如下：
 + Team -> 球隊名稱，可選擇ALL或是單一球隊，球隊名稱請從附件資料中整理出來。
 + keywords -> 可輸入關鍵字比對球員名稱(部分比對)
4. 按下「Search」按鈕後依照搜尋條件顯示符合條件的資料於表格中。
5. 按下每筆資料的Detail圖示，會跳至另一頁面顯示該球員的所有詳細資料，如以下示意圖，顯示的欄位名稱與資料key值對應關係請參閱下方對應表。
![](https://i.imgur.com/o76uYrR.png)

6. 按下「Show Charts」按鈕後，會跳出視窗，以圓餅圖或柱狀圖(會是其他形式的圖表)，顯示球員人數在15人以下(含15人)的球隊的統計資料。
![](https://i.imgur.com/yXpRQSq.png)

7. 請依照您的喜好與標準美化系統介面, 色彩樣式不拘。


### 資料格式與介面顯示對照表：

|排序 |      JSON欄位名稱              |     介面顯示  | 
|--- |          -----                |     -----    | 
| 1  | name                          |   Name       | 
| 2  | team_acronym                  |   Team       |
| 3  | team_name                     |   TeamName   |
| 4  | games_played                  |   Games      |
| 5  | minutes_per_game              |   MPG        |
| 6  | field_goals_attempted_per_game|   FGA        |
| 7  | field_goals_made_per_game     |   FGM        |
| 8  | field_goal_percentage         |   FG%        |
| 9  | free_throw_percentage         |   FT%        |
| 10 | three_point_attempted_per_game|   3PA        |
| 11 | three_point_made_per_game     |   3PM        |
| 12 | three_point_percentage        |   3PT%       |
| 13 | points_per_game               |   Points     |
| 14 | offensive_rebounds_per_game   |   ORebounds  |
| 15 | defensive_rebounds_per_game   |   DRebounds  |
| 16 | rebounds_per_game             |   Rebounds   |
| 17 | assists_per_game              |   Assists    |
| 18 | steals_per_game               |   Steals     |
| 19 | blocks_per_game               |   Blocks     |
| 20 | turnovers_per_game            |   Turnovers  |
| 21 | player_efficiency_rating      |   Efficiency |

EX.頁面上的「Team」欄位請顯示json資料中的team_acronym ...，以此類推。

----
### 注意事項：
1. Task1請以Node.js + express + ES6完成，Task2請以React.js + ES6 完成
2. 不限制使用的函式庫及程式編寫方式
3. 程式需可執行，並提供簡單的程式說明及架設文件

----
project完成後請將project及相關文件打包寄至 rick.chen@lndata.com<br>
Please send back your project and document to rick.chen@lndata.com
