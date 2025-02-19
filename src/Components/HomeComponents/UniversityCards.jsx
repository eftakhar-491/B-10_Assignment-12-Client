export default function UniversityCards() {
  const universities = [
    {
      id: 1,
      name: "Harvard University",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/800px-Harvard_University_coat_of_arms.svg.png",
      tagline: "Excellence in Education",
    },
    {
      id: 2,
      name: "Stanford University",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/800px-Seal_of_Leland_Stanford_Junior_University.svg.png",
      tagline: "Innovating the Future",
    },
    {
      id: 3,
      name: "MIT",
      logo: "https://brand.mit.edu/sites/default/files/styles/image_text_2x/public/2023-08/MIT-logo-red-textandimage.png?itok=RNoAwZvy",
      tagline: "Advancing Knowledge & Technology",
    },
    {
      id: 4,
      name: "Oxford University",
      logo: "https://icon2.cleanpng.com/20180921/ec/kisspng-university-college-oxford-collegiate-university-s-home-oxford-outfitters-1713935919342.webp",
      tagline: "Leading in Research & Teaching",
    },
    {
      id: 5,
      name: "Cambridge University",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsm33CKo5uDuq6A9A6nSD-qQEhAEFvoVew-w&s",
      tagline: "A Tradition of Excellence",
    },
    {
      id: 6,
      name: "Yale University",
      logo: "https://i.pinimg.com/736x/20/33/58/203358e5a19d1567ab83bc612ae1a61f.jpg",
      tagline: "Expanding Horizons of Learning",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Partner Universities
        </h2>
        <p className="mt-3 text-gray-600">
          We are affiliated with top institutions around the world, ensuring the
          highest quality education.
        </p>
      </div>
      <div className="max-w-[1900px] mx-auto px-[5%] mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Cards - Placeholder content */}
        {universities.map((university, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              <img
                src={university.logo}
                alt={university.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              {university.name}
            </h3>
            <p className="text-gray-500 text-sm mt-2">{university.tagline}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
