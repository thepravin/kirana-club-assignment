import { useState, useCallback, useEffect } from "react";
import { useContests } from "../api/codeforcesApi";
import { CodeforcesContest, CodeforcesApiResponse } from "../types/codeforces";
import {
  TextField,
  Select,
  Badge,
  Pagination,
  Link,
  Spinner,

} from "@shopify/polaris";
import debounce from "lodash/debounce";

import ChartComponent from "../components/ChartComponent";

function ContestListPage() {
  const { data, isLoading, isError, error } = useContests();

  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");
  const [selectedContestType, setSelectedContestType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);


  const debouncedHandleSearch = useCallback(
    debounce((value: string) => setDebouncedSearchValue(value), 500),
    []
  );

  useEffect(() => {
    debouncedHandleSearch(searchValue);
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [searchValue, debouncedHandleSearch]);



  const handleSelectChange = useCallback(
    (value: string) => setSelectedContestType(value),
    []
  );

  const handleItemsPerPageChange = useCallback((value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  }, []);

  const handleClearButtonClick = useCallback(() => {
    setSearchValue("");
    setDebouncedSearchValue("");
  }, []);

  const handlePaginationChange = useCallback((action: "next" | "prev") => {
    setCurrentPage((prev) => (action === "next" ? prev + 1 : prev - 1));
  }, []);

  if (isLoading) {
    return (
      <div className="flex-center h-screen">
        <Spinner accessibilityLabel="Loading contests" size="large" />
      </div>
    );
  }
  if (isError) {
    return <p>Error: {error?.comment || "An error occurred"}</p>;
  }

  const contestsData = data as CodeforcesApiResponse | undefined;

  if (!contestsData) {
    return <p>No contests available.</p>;
  }



  const filteredContests = contestsData.result.filter((contest) => {
    const typeMatch =
      selectedContestType === "" || contest.type === selectedContestType;
    const nameMatch = contest.name
      .toLowerCase()
      .includes(debouncedSearchValue.toLowerCase());

    return typeMatch && nameMatch;
  });

  const totalPages = Math.ceil(filteredContests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedContests = filteredContests.slice(startIndex, endIndex);

  const options = [
    { label: "All", value: "" },
    { label: "ICPC", value: "ICPC" },
    { label: "CF", value: "CF" },
  ];

  const itemsPerPageOptions = [
    { label: "10", value: "10" },
    { label: "25", value: "25" },
    { label: "50", value: "50" },
    { label: "75", value: "75" },
    { label: "100", value: "100" },
  ];

  return (
    <div>
      <div className="graph-container">
        <ChartComponent contests={filteredContests} />
      </div>

      <div className="flex contest-list-page">
        <div className="flex-2 flex flex-center">
          <Select
            label="Contest Type"
            options={options}
            onChange={handleSelectChange}
            value={selectedContestType}
          />
          <Select
            label="Items per page"
            options={itemsPerPageOptions}
            onChange={handleItemsPerPageChange}
            value={itemsPerPage.toString()}
          />


        </div>
        <div className="flex-8 textfield">
          <TextField
            label="Search contests using names"
            value={searchValue}
            onChange={(value) => setSearchValue(value)}
            clearButton
            onClearButtonClick={handleClearButtonClick}
            autoComplete="off"            
          />

        </div>
      </div>

      {filteredContests.length === 0 ? (
        <p className="flex-center mt-4">No contest available with this name!</p>
      ) : (
        <div className="all-contests-cards">
          {paginatedContests.map((contest: CodeforcesContest) => (
            <div className="contest-card" key={contest.id}>
              <Link removeUnderline url={`/contest/${contest.id}`}>
                <h2>{contest.name}</h2>
              </Link>
              <div className="flex mt-4">
                <Badge tone="critical">{contest.type}</Badge>
                {contest.phase === "BEFORE" ? (
                  <Badge progress="partiallyComplete" tone="warning">
                    Upcoming
                  </Badge>
                ) : (
                  <Badge progress="complete" tone="success">
                    Contest Over
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination flex-center mt-4">
        <div className="innerPagination">
          {filteredContests.length > itemsPerPage && (
            <Pagination
            label={currentPage}
              hasPrevious={currentPage > 1}
              hasNext={currentPage < totalPages}
              onPrevious={() => handlePaginationChange("prev")}
              onNext={() => handlePaginationChange("next")}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ContestListPage;
