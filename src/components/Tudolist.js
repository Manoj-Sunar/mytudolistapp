import React, { useEffect, useState } from "react";
import tudolistimg from "../images/tudolist.png";

const getData = () => {
  const itemsList = localStorage.getItem("tudolists");
  if (itemsList) {
    return JSON.parse(itemsList);
  } else {
    return [];
  }
};

const Tudolist = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getData());
  const [EditData, setEditData] = useState("");
  const [toggle, setToggle] = useState(false);

  //Add items
  const AddItems = () => {
    if (!inputData) {
      alert("please Enter Inputdata");
    } else if (inputData && toggle) {
      setItems(
        items.map((currentEle) => {
          if (currentEle.id === EditData) {
            return { ...currentEle, name: inputData };
          }

          return currentEle;
        })
      );

      setInputData("");
      setEditData(null);
      setToggle(false);
    } else {
      const newIputItems_list = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, newIputItems_list]);
    }
  };

  //EditItems
  const EditItemslist = (itemsId) => {
    const Edit = items.find((CurrentId) => {
      return CurrentId.id === itemsId;
    });

    setInputData(Edit.name);
    setEditData(itemsId);
    setToggle(true);
  };

  //Deleting Data
  const DeleteItems = (itemsId) => {
    const DeletingItems = items.filter((CurrentId) => {
      return CurrentId.id !== itemsId;
    });

    setItems(DeletingItems);
  };

  //   Delete All Data
  const RemoveAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("tudolists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-12 mx-auto  main-tudolist p-5">
            <div className="tudolistimg">
              <img src={tudolistimg} alt="" />
            </div>
            <h5 className="text-center header mb-4">Add your Items here ✌</h5>

            <div className="input-tudo-list mx-auto ">
              <input
                type="text"
                className="form-control  m-auto"
                placeholder="✍ Add your items"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />

              {toggle ? (
                <i
                  className="fa-solid fa-pen-to-square edit-Items  fw-bolder"
                  onClick={AddItems}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-plus  fw-bolder"
                  onClick={AddItems}
                ></i>
              )}
            </div>

            {items.map(({ name, id }) => {
              return (
                <>
                  <div
                    className="form-control mx-auto my-3 input-tudo-list-container my-2"
                    key={id}
                  >
                    <h5 className="my-auto">{name}</h5>
                    <div className="performs-icon">
                      <i
                        className="fa-solid fa-pen-to-square me-2"
                        onClick={() => EditItemslist(id)}
                      ></i>
                      <i
                        className="fa-solid fa-trash mx-1"
                        onClick={() => DeleteItems(id)}
                      ></i>
                    </div>
                  </div>
                </>
              );
            })}

            <div className="Remove-all-btn">
              <button
                className="btn-remove-all d-block mx-auto my-2"
                onClick={RemoveAll}
              >
                Remove All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tudolist;
