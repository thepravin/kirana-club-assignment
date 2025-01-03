## Kirana Club Assignment

### Objective:
Develop a single-page web application (SPA) using ReactJS and Polaris by Shopify to display and interact with Codeforces contest data. This application should provide a user-friendly interface for browsing, searching, and visualising contest information.
### Data Source:
You will fetch contest data from the Codeforces API: ``` https://codeforces.com/api/contest.list ```


### Live Url : 
```mash
https://kirana-club-assignment-pravin.vercel.app/
```


### Required Features:
1.	Contest Listing:
- Display a list of contests fetched from the API.
2.	Filtering:
-	Implement a dropdown filter to allow users to filter contests by type (ICPC/CF).
-	Implement a search bar to filter contests by name.
3.	Pagination:
-	Implement client-side pagination for the contest list.
-	Allow users to select the number of contests to display per page.
4.	Dynamic Filtering:
- As the user types in the search bar, dynamically filter the contest list (client-side).
5.	Data Visualization:
-	Create a graph visualizing duration Seconds against the name for the contests.
-	Allow dynamic filtering of the graph data based on phase and type.
-	Choose a suitable charting library that integrates well with React and Polaris (e.g., Chart.js, Recharts).

### Additional Features (Brownie Points):
1.	Debouncing: Implement debouncing for the search functionality to optimize performance.
2.	Contest Details Page:
-	Create a dedicated page to display detailed information about a contest when the user clicks on its name.
-	The page should be accessible via a route like ``` /contest/{contest_id}  ```
-	Display the following details: id, name, type, phase, and start time (converted to the user's local time). You may need to extract relevant information from the API response to determine the "description" of 
  the contest.
3.	Favorites:
-	Allow users to mark contests as favorites.
-	Implement a filter to display only favorite contests.
4.	Enhancements: Add tooltips to the graph and other UI elements to provide additional context and improve user experience.



<div align="center">
<h1>🧑‍💻 Happy coding!</h1>
</div>

   
