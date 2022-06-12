import React, { useContext, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import { Image, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import ComicPagesList from "../componets/comic-pages/comic-pages-list/comicPagesList";
import { useWindowDimensions } from "react-native";
import PageModal from "../componets/comic-pages/page-modal/pageModal";
import Information from "../componets/comic-pages/info/info";
import { DataContext } from "../componets/comic-pages/dataContext";
import { AppContex } from "../componets/appContex";
import { pageReducer } from "../reducers/pageReducer";
import { useRoute } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { readComics, updateBookmark } from "../store/comics/asyncActions";
import { LOADING, SUCCESSFUL } from "../constants";
import { librarySlice } from "../store/library/slice";
import { userLibrarySlice } from "../store/userLibrary/slice";

const ComicsScreen = ({ navigation }) => {

  const window = useWindowDimensions();
  const route = useRoute()
  const { token } = useSelector(state => state.user);
  const { comics, comicsFetchingState } = useSelector(state => state.comics)
  const dispatch = useDispatch();

  const { id, author } = route.params;

  const [visiable, setVisiable] = useState(false);

  const scrollView = useRef();
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    dispatch(readComics({ token, id }));
  }, [id])


  useEffect(() => {
    if (comicsFetchingState == SUCCESSFUL) {
      setPageIndex(comics.bookmark)
      scrollView.current.scrollTo({ x: window.width * comics.bookmark, y: 0, animated: false });
    }
  }, [comicsFetchingState])


  const createMarkbook = (page) => {
    dispatch(updateBookmark({ token: token, comicsId: id, pageNumber: page }));
    dispatch(userLibrarySlice.actions.updateComics({ comicsId: id, bookmark: page }));
  }

  //-1 - вправо, 1 - влево
  const handlePage = (sign) => {
    if (pageIndex == 0 && ~sign) return;
    if (pageIndex == comics.pages.length - 1 && !~sign) return;
    setPageIndex(pageIndex - 1 * sign)
  };

  const handlePageWithAnim = (sign) => {
    if (pageIndex == 0 && ~sign) return;
    if (pageIndex == comics.pages.length - 1 && !~sign) return;
    const newPageIndex = pageIndex - 1 * sign;
    setPageIndex(newPageIndex);
    scrollView.current.scrollTo({ x: window.width * newPageIndex, y: 0, animated: true });
  }


  return (
    comicsFetchingState == LOADING
      ? <ActivityIndicator></ActivityIndicator>
      : <View style={styles.wrapper}>
        < View onTouchEnd={() => setVisiable(!visiable)}>
          <Information
            information={{
              page: pageIndex,
              pages: comics.pages.length,
              author: author,
              setBookmark: createMarkbook,
            }}
          ></Information>
          <View style={{ flex: 10 }}>
            <ComicPagesList
              pages={comics.pages}
              isModal={visiable}
              inputRef={scrollView}
              initialPage={comics.bookmark}
              setPage={handlePage}
            />
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
        <PageModal
          visiable={visiable}
          handlePage={handlePageWithAnim}
          pageIndex={pageIndex}
          setBookmark={createMarkbook}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#000000",
    position: "relative",
  },
});

export default ComicsScreen;
