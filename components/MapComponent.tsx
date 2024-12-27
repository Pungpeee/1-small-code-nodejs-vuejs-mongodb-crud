import React, {
  useEffect,
  useRef,
  useState,
  FC,
  CSSProperties,
  useCallback,
} from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

interface MapComponentProps {
  setLatLong: (value: string) => void;
  setPopup: (value: boolean) => void;
}

const containerStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
};

const defaultCenter = {
  lat: 13.7237248,
  lng: 99.9736399,
};

const MapComponent: FC<MapComponentProps> = ({ setLatLong, setPopup }) => {
  const [center, setCenter] = useState(defaultCenter);
  const [selected, setSelected] = useState<any>(defaultCenter);
  const [address, setAddress] = useState<string>("");
  const searchBoxRef = useRef<HTMLInputElement>(null);

  const mapRef = useRef<google.maps.Map>();

  useEffect(() => {
    const geocoder = new google.maps.Geocoder();
    if (selected) {
      geocoder.geocode({ location: selected }, (results, status) => {
        if (status === "OK" && results![0]) {
          setAddress(results![0].formatted_address);
          setLatLong(`${selected.lat},${selected.lng}`);
        }
      });
    }
  }, [selected, setLatLong]);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    const searchBox = new google.maps.places.SearchBox(
      searchBoxRef.current as HTMLInputElement,
    );

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      searchBoxRef.current as HTMLInputElement,
    );

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const location = places[0].geometry?.location;
        const newCenter = {
          lat: location?.lat()!,
          lng: location?.lng()!,
        };
        setCenter(newCenter);
        setSelected(newCenter);
        setLatLong(`${newCenter.lat},${newCenter.lng}`);
        map.setCenter(newCenter);
      }
    });
  };

  const onMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    const newPos = event.latLng!;
    setCenter({
      lat: newPos.lat(),
      lng: newPos.lng(),
    });
    setSelected(newPos.toJSON());
    setLatLong(`${newPos.lat()},${newPos.lng()}`);
  };

  return (
    <>
      <input
        type="text"
        ref={searchBoxRef}
        placeholder="Search places..."
        className="search-box"
      />
      <GoogleMap
        mapContainerStyle={containerStyle as CSSProperties}
        center={center}
        zoom={16}
        onLoad={onLoad}
      >
        <Marker
          position={center}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
          onClick={() => setSelected(center)}
        />
        {selected && (
          <InfoWindow
            position={selected}
            onCloseClick={() => setSelected(null)}
            options={{ pixelOffset: new google.maps.Size(0, -40) }}
          >
            <div>
              <p className="info-window-content">
                {address ? address : "Loading..."}
              </p>
              <button
                className="btn-selected-map"
                onClick={() => {
                  setPopup(false);
                  setLatLong(`${selected.lat},${selected.lng}`);
                }}
              >
                เลือก
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
};

export default MapComponent;
