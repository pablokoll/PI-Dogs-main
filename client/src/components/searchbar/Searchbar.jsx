/* eslint-disable */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBreedName } from "../../redux/actions";
import { useLocation, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./SearchBar.module.css";
import { SiDatadog } from "react-icons/si";
import {
  MdFavorite,
  MdPets,
  MdQuestionAnswer,
  MdHome,
  MdSearch,
} from "react-icons/md";

export default function SearchBarr({ setCurrentPage, setOrden, listaTemp, setListaTemp }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [search, setSearch] = useState({
    breedFind: "",
  });

  function handleChange(e) {
    setSearch((prevData) => {
      const state = {
        ...prevData,
        [e.target.name]: e.target.value,
      };
      if (state.breedFind) {
        state.breedFind =
          state.breedFind[0].toUpperCase() + state.breedFind.substring(1);
      }
      return state;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(search.breedFind.length){
      dispatch(searchBreedName(search.breedFind));
      setSearch(() => ({
        breedFind: "",
      }));
      setCurrentPage(1);
      setOrden(`Filtrado ${e.target.value}`)
    }else{
      dispatch(searchBreedName(search.breedFind));
      setListaTemp([])
      setCurrentPage(1);
      setOrden(`Filtrado`);
    }
  }

  return (
    <nav className={styles.nav}>
      <NavLink to="/">
        <h3 className={styles.h1}>
          <SiDatadog className={styles.logo} /> BFF Gallery
        </h3>
      </NavLink>
      {location.pathname === "/home/" || location.pathname === "/home" ? (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.formInput}>
          <div className={styles.inputDiv}>
            <input
              type="text"
              name="breedFind"
              onChange={(e) => handleChange(e)}
              value={search.breedFind}
              className={styles.inputSearch}
              placeholder="Search your best friend..."
              autoComplete="off"
            />
            <div className={styles.divSearch}>
              <button type="submit" className={styles.btnSearch}>
                <MdSearch className={styles.iconSearch} />
              </button>
            </div>
          </div>
        </form>
      ) : location.pathname === "/home/create" ||
        location.pathname === "/home/create/" ? (
        <div className={styles.divSearchBarCenter}>
          <h2 className={styles.h2SearchBar}>Create a BFF</h2>
        </div>
      ) : location.pathname === "/home/favourites" ||
        location.pathname === "/home/favourites/" ? (
        <div className={styles.divSearchBarCenter}>
          <h2 className={styles.h2SearchBar}>My Favourites BFF</h2>
        </div>
      ) : location.pathname == `/home/breed/${id}` ? (
        <div className={styles.divSearchBarCenter}>
          <h2 className={styles.h2SearchBar}>Breed Details</h2>
        </div>
      ) : (
        <div className={styles.divSearchBarCenter}>
          <h2 className={styles.h2SearchBar}>About Me</h2>
        </div>
      )}

      <div className={styles.divBotones}>
        <NavLink to="/home">
          <button className={styles.btnCreate}>
            <MdHome className={styles.iconSearchB} /> Home
          </button>
        </NavLink>
        <NavLink to="/home/create">
          <button className={styles.btnCreate}>
            <MdPets className={styles.iconSearchB} /> Create
          </button>
        </NavLink>
        <NavLink to="/home/favourites">
          <button className={styles.btnCreate}>
            <MdFavorite className={styles.iconSearchB} /> My BFF's
          </button>
        </NavLink>

        <NavLink to="/home/about">
          <button className={styles.btnCreate}>
            <MdQuestionAnswer className={styles.iconSearchB} /> About
          </button>
        </NavLink>
      </div>
    </nav>
  );
}
