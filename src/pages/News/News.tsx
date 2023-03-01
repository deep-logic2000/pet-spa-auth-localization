import React, { FC, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hooks/typedRedux";
import { useTranslation } from "react-i18next";
import { openErrorSnackBar } from "../../store/reducers/snackBarSlice";

import NewsElement from "../../components/NewsItem/NewsElement";

import { fetchNews } from "../../store/reducers/newsSlice";

import styles from "./News.module.scss";

export interface Inew {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const News: FC = () => {
  const data = useAppSelector((state) => state.news.news);
  const currentPage = useAppSelector((state) => state.news.currentPage);
  const totalNewsCount = useAppSelector((state) => state.news.totalNewsCount);
  const countOfDeletedNews = useAppSelector(
    (state) => state.news.countOfDeletedNews
  );
  const isLoading = useAppSelector((state) => state.news.isLoading);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const fetchMoreNews = useCallback(async () => {
    const resultAction = await dispatch(fetchNews(currentPage));
    if (!fetchNews.fulfilled.match(resultAction)) {
      dispatch(openErrorSnackBar(t("snackBar.messages.fetchNewsError")));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [currentPage, dispatch, navigate, t]);

  useEffect(() => {
    if (data.length === 0) {
      fetchMoreNews();
    }
  }, [dispatch, currentPage, data.length, fetchMoreNews]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 3 }}>
      <ul className={styles.listWrapper}>
        {data?.map((item: Inew, index: number) => (
          <NewsElement newsData={item} index={index} key={item.id} />
        ))}
      </ul>
      {isLoading && <p>{t("services.loading")}</p>}
      {data.length < totalNewsCount - countOfDeletedNews && !isLoading && (
        <Button variant="contained" onClick={fetchMoreNews}>
          {t("buttons.loadMore")}
        </Button>
      )}
    </Container>
  );
};

export default News;
