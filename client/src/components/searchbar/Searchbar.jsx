import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBreedsName } from "../../redux/actions";


export default function SearchBarr() {
  // const breedNameState = useSelector((state) => state.breedsName);
  const dispatch = useDispatch();
  // useEffect(() => {
  //dispatch(getBreedsName(state));
  // }, [dispatch]);

  const [state, setState] = useState({
    breedFind: "",
  });

  function handleChange(e) {
    setState((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
    e.preventDefault();
    //dispatch(getBreedsName(state.breedFind))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(getBreedsName(state.breedFind))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Breed:</label>
        <input
          type="text"
          name="breedFind"
          onChange={(e) =>handleChange(e)}
          value={state.breedFind}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}