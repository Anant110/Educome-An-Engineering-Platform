  
  
  useEffect(() => {
    listAll(ref(storage, 'Files')).then(img => {
      console.log(img); 
      img.items.forEach(val => {
       const lastFile = img.items[img.items.length - 1];
        getDownloadURL(lastFile).then((url) => {
          setProfileImage(url);
          setData({...data,photoURL: url});
          // console.log(data.photoURL);
        });
      });
    }
    );
  }, []);