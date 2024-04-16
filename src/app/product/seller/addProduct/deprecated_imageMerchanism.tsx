// const [images, setImages] = useState<Product["images"]>([]);

//   const [imageUrl, setImageUrl] = useState<string>();
//   const [insertImageField, setInsertImageField] = useState<React.JSX.Element[]>(
//     []
//   );

/// BAGIAN GAMBAR WOI ///
  // interface ImageField {
  //   id: string;
  //   value: string;
  // }

// const images = imageFields
//         .filter((field) => checkURLValid(field.value))
//         .map((field) => {
//           return field.value;
//         });
//       console.log("INI GAMBAR bos", images);

// function getDefault(): ImageField {
//   return {
//     id: crypto.randomUUID(),
//     value: "",
//   };
// }

// const [imageFields, setImageFields] = useState<ImageField[]>([getDefault()]);

// function imageFieldsHandler(
//   id: string,
//   e: React.ChangeEvent<HTMLInputElement>
// ) {
//   setImageFields(
//     imageFields.map((field) => {
//       if (field.id === id) {
//         //if id n.n equals to n
//         return {
//           ...field,
//           value: e.target.value,
//         }; //Update the field that consists of id and value, with this specific syntax update the value of id n.n with the event object of the n
//       }
//       return field; //the updated field is returned
//     })
//   ); // set the updated field of id: n from {id: n, value: " "} to {id: n, value: ` event_object_of_n `}
// }

// function addImageFields() {
//   // Used for if the user add new input field
//   setImageFields([...imageFields, getDefault()]); // to set up the rest of the value of imageFields and displays it and also
//   // The new input field has identity (id) and default value of " " empty string
// }

// function deleteImageField(id: string) {
//   setImageFields(imageFields.filter((field) => field.id !== id));
// }

// function checkURLValid(_url: string) {
//   const urlRegex =
//     /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
//   return urlRegex.test(_url);
// }
// ///////
// /// BAGIAN GAMBAR WOI ///

{/* <div className="space-y-3 pt-5">
          <div className="font-semibold">Image Urls</div>
          <div className="flex flex-col gap-1">
            {imageFields.map((field) => {
              return (
                <div
                  key={field.id}
                  className={`${
                    field.value && !checkURLValid(field.value)
                      ? "ring-red-500 ring"
                      : ""
                  } flex gap-3 bg-black/5 px-2 py-1`}
                >
                  <input
                    className="w-full text-slate-900 focus:outline-none bg-transparent"
                    placeholder="Input URL`s image"
                    onChange={(e) => imageFieldsHandler(field.id, e)}
                  />
                  <button
                    onClick={() => deleteImageField(field.id)}
                    type="button"
                    className=""
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            onClick={addImageFields}
          >
            Add More URLs Image
          </button>
        </div> */}