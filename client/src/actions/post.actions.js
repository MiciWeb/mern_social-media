import axios from "axios"

//post
export const GET_POSTS = "GET_POSTS";

export const getPosts = (num) => {
    return (dispatch) => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}api/post/`)
        .then((res) => {
        //   const array = res.data.slice(0, num);
          dispatch({ type: GET_POSTS, payload: res.data });
        //   dispatch({ type: GET_ALL_POSTS, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };
  