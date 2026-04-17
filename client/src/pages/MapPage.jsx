import { useEffect } from "react";

export default function MapPage() {
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(pos=>{
      const lat=pos.coords.latitude;
      const lng=pos.coords.longitude;

      const map=new window.google.maps.Map(
        document.getElementById("map"),
        {center:{lat,lng},zoom:13}
      );

      new window.google.maps.Marker({position:{lat,lng},map});
    });
  },[]);

  return <div id="map" style={{height:"500px"}}></div>;
}