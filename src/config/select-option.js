import  { useState, useEffect } from "react";
import { Config } from "./connection";
// import { Rate } from "rsuite";
const api = Config.urlApi;
// const buildingId=localStorage.getItem('buildingId');
export function useProvince() {
  const [itemProvince, setItemProvince] = useState([]);
  useEffect(() => {
    const showProvince = async () => {
      try {
        const response = await fetch(api + 'province');
        const jsonData = await response.json();
        setItemProvince(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    showProvince();
  }, []); 
  const data = itemProvince.map(item => ({ label: item.provinceName, value: item.province_id }));
  return data;
}
export function useTitle() {
      const [itemTiles, setItemTiles] = useState([]);
    useEffect(() => {
      const fetchTile = async () => {
  
          try {
              const response = await fetch(api + 'tileps/');
              const jsonData = await response.json();
              setItemTiles(jsonData);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      }
      fetchTile();
    }, []); 
    return itemTiles;
  }
  


// export function useFloor() {
//   const [itemFloor, setItemFloor] = useState([]);
//   useEffect(() => {
//     const showFloor = async () => {
//       try {
//         const response = await fetch(api + 'floor/'+buildingId);
//         const jsonData = await response.json();
//         setItemFloor(jsonData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     showFloor();
//   }, []); 
//   const data = itemFloor.map(item => ({ label: item.floorName, value: item.floor_id }));
//   return data;
// }


export function useProperty() {
  const [itemProperty, setItemProperty] = useState([]);
  useEffect(() => {
    const showProperty = async () => {
      try {
        const response = await fetch(api + 'property/');
        const jsonData = await response.json();
        setItemProperty(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    showProperty();
  }, []); 
  const data = itemProperty.map(item => ({ label: item.propertyName, value: item.property_id }));
  return data;
}


export function useTypes() {
    const [itemTypes, setItemTypes] = useState([]);
    useEffect(() => {
      const showTypes = async () => {
        try {
          const response = await fetch(api + 'option/types');
          const jsonData = await response.json();
          setItemTypes(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      showTypes();
    }, []); 
    const data = itemTypes.map(item => ({ label: item.typesName, value: item.types_id }));
    return data;
  }



export function useTypesOtion() {
  const [itemOption, setItemOption] = useState([]);
  useEffect(() => {
    const showOption = async () => {
      try {
        const response = await fetch(api + 'type/option');
        const jsonData = await response.json();
        setItemOption(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    showOption();
  }, []); 
  return itemOption;
}

  export function useCurrency() {
    const [itemCurrency, setItemCurrency] = useState([]);
    useEffect(() => {
      const showCurrency = async () => {
        try {
          const response = await fetch(api + 'currency/');
          const jsonData = await response.json();
          setItemCurrency(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      showCurrency();
    }, []); 
  
    const data = itemCurrency.map(item => ({ label: item.currency_name+' / '+item.genus, value: item.currency_id,rate:item.reate_price,genus:item.genus }));
  
    return data;
  }







