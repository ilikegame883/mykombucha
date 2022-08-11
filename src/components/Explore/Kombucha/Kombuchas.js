import KombuchaLinkTabs from "./KombuchaLinkTabs/KombuchaLinkTabs";
import KombuchaList from "./KombuchaList";
import RecentReviewList from "./RecentReviewList";

export const PAGE_SIZE = 5; //# of items for each page under tab

const Kombucha = ({ recentReviews, kombuchaData, category, page }) => {
  //total = total number of sorted items
  const { total } = kombuchaData || recentReviews;
  const pageCount = Math.ceil(total.count / PAGE_SIZE);

  return (
    /* //pass in category (params) from getServerSideProps to underline active tab links.
          //category value will be used to match each page with individual tab link */
    <KombuchaLinkTabs
      category={category}
      currentPage={page}
      pageCount={pageCount}
    >
      {kombuchaData && (
        <KombuchaList
          kombuchaList={kombuchaData.sorted_list}
          category={category}
        />
      )}
      {recentReviews && (
        <RecentReviewList reviewList={recentReviews.sorted_list} />
      )}
    </KombuchaLinkTabs>
  );
};

export default Kombucha;
