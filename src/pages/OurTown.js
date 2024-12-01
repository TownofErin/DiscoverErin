import React from 'react';
import DefaultLayout from '../components/layouts/DefaultLayout';

const HistoryCard = ({ title, children }) => (
  <div className="max-w-4xl mx-auto mb-24">
    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{title}</h2>
    <div className="prose max-w-none text-gray-600 text-lg leading-relaxed">
      {children}
    </div>
  </div>
);

const CommunityCard = ({ title, children }) => (
  <div className="mb-16">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
    <div className="prose max-w-none text-gray-600 text-lg leading-relaxed">
      {children}
    </div>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-gray-900 mb-3">{question}</h3>
    <p className="text-gray-600 text-lg leading-relaxed">{answer}</p>
  </div>
);

const OurTown = () => {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <div className="bg-[#E5EDE5] w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-lg text-gray-600 uppercase tracking-wider mb-6">
                ABOUT ERIN
              </h2>
              <h1 className="text-5xl font-bold text-gray-900 mb-8">
                About Our Town
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Erin boasts several must-visit attractions, including the scenic Erin Heritage Walking Trail, 
                the charming village of Hillsburgh, and the beautiful Elora Cataract Trailway. Be sure to 
                explore the Erin Fall Fair, one of Ontario's oldest agricultural fairs.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://vtzfrysrrermupdjfsnh.supabase.co/storage/v1/object/public/img/headers/about-us.jpg"
                alt="Erin Fall Fair Ferris wheel lit up at night"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* History Section */}
        <div className="mb-24">
          <h2 className="text-lg text-gray-600 uppercase tracking-wider mb-16 text-center">HISTORY</h2>
          <HistoryCard title="History of the Town">
            <div className="space-y-8">
              <p>
                Nathaniel Roszel, a native of Pennsylvania, was the first settler in Erin Township. He took up the land at Lot 1, 
                Concession 7 in November 1820. On November 11, 1821, his son Benjamin, their first child was born. It was here the 
                hamlet of Ballinafad sprang up, and here, Erin Township began.
              </p>
              <p>
                The next year, 1821, William How and his family came from Kent, England, and made Lots 22 and 23, Concession 7, 
                their home in what is now Hillsburgh. The settlement that Mr. How started was called Howville but in 1823 Nazareth 
                Hill took possession of Lot 25 and built the first hotel on the site of today's Foodland. The name of the settlement 
                was changed to Hillsburgh.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <img
                  src="https://vtzfrysrrermupdjfsnh.supabase.co/storage/v1/object/public/img/headers/history1.jpg"
                  alt="Historic Erin"
                  className="w-full h-80 object-cover rounded-xl"
                />
                <img
                  src="https://vtzfrysrrermupdjfsnh.supabase.co/storage/v1/object/public/img/headers/history2.jpg"
                  alt="Historic Hillsburgh"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </HistoryCard>
        </div>

        {/* Communities Section */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mb-24">
          <CommunityCard title="Crewsons Corners">
            <p>
              Crewsons Corners is comprised of the corners of four townships in two counties, the south corner 
              of the Town of Erin, the east corner of Guelph Eramosa, in Wellington, the west corner of 
              Esquesing and the north corner of Nassagaweya, in Halton Hills. It was first called Ryckman's 
              Corner after Samuel Ryckman, the surveryor, who laid out Eramosa and Nassagaweya but later 
              changed to Crewsons Corners for the first family to live in the area.
            </p>
          </CommunityCard>

          <CommunityCard title="Ballinafad">
            <p>
              Ballinafad was named after a village in Ireland and is the location of the home of the first 
              white settler in Erin Township, who came to the area from Pennsylvania in 1821. The community 
              grew to include a general store and post office which is still running today. There was also a 
              school, a United Church which still hosts United Church Suppers to this day, a temperance hall, 
              parsonage, two hotels, one that was lost to fire but was one of the last remaining hotels in 
              the area, a chopping mill, two blacksmith shops, a wagonmaker, a pumpmaker and a shoemaker.
            </p>
            <p className="mt-4">
              The Methodist Church with a Good Templar's Hall on the second floor stood in the location of 
              the current Ballinafad Community Centre. Ballinafad was a stop along The Old York Trail to 
              Toronto from Guelph. A stagecoach ran from Georgetown to Erin in 1871.
            </p>
          </CommunityCard>

          <CommunityCard title="Brisbane">
            <p>
              Brisbane is located at the corner of the "Guelph Road" or Wellington Rd. 124 and Trafalgar Rd. 
              The village was originally named Bristol and was surveyed in 1854. In the early days, Brisbane 
              had a blacksmith shop, gunsmith, woodworking shop, and two hotels. The original post office 
              was located at the site of the PetroCan station and mail was brought from Guelph by stage.
            </p>
          </CommunityCard>

          <CommunityCard title="Ospringe">
            <p>
              Ospringe was named for a village in England, a suburb of Canterbury in the county of Kent, 
              from which came the first settlers around the immediate corner in 1842. The settlement began 
              earlier (1831) but wasn't named. A toll gate was located in Ospringe on the Erin to Guelph 
              Road in 1875. The hamlet boasted two grocery stores, the Fielding Hotel, a United Church, two 
              blacksmith shops, and a wagon shop.
            </p>
          </CommunityCard>

          <CommunityCard title="Cedar Valley">
            <p>
              Cedar Valley was originally called Slabtown in the eighteen hundreds. The name was taken 
              because of the sawmill operation by the Tarzwell family that was operated in the hamlet. Cedar 
              Valley boasted a pump manufacturing business, a planing mill and blacksmith shop, a grocery 
              store, a church and a welding shop in its early days. Cedar Valley had its first telephone in 1910, 
              rural mail delivery in 1912, their first hydro in the early 1930s.
            </p>
          </CommunityCard>

          <CommunityCard title="Orton">
            <p>
              Orton was first named "Little Chicago", but was later named Orton in honor of the Dr. Orton of 
              Fergus, who so faithfully looked after his rural patients in those horse and buggy/cutter days. 
              Orton was on the Credit Valley Railway line from 1879, with the station on the Garafraxa side. 
              Early Orton was a thriving community with a railway station, post office, Royal Bank, 2 stores, 
              a blacksmith shop, chopping mill, fire hall.
            </p>
          </CommunityCard>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg text-gray-600 uppercase tracking-wider mb-16 text-center">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="space-y-12">
            <FAQItem 
              question="What are the main attractions in Erin?"
              answer="Erin offers several attractions including the Erin Heritage Walking Trail, the historic village of Hillsburgh, the Elora Cataract Trailway, and the annual Erin Fall Fair. The town is also known for its scenic beauty, local shops, and restaurants."
            />
            <FAQItem 
              question="How do I get to Erin?"
              answer="Erin is easily accessible by car from major cities. From Toronto, take Highway 401 W to Highway 124. The town is approximately 80 km northwest of Toronto. Public transit options include GO Transit to nearby stations with taxi service to Erin."
            />
            <FAQItem 
              question="What makes Erin unique?"
              answer="Erin is known for its rich history, rural charm, and strong sense of community. The town combines historic architecture with modern amenities, surrounded by beautiful countryside. It's particularly famous for its equestrian community and agricultural heritage."
            />
            <FAQItem 
              question="What events happen in Erin throughout the year?"
              answer="The most notable event is the Erin Fall Fair, one of Ontario's oldest agricultural fairs. The town also hosts various seasonal events, farmers' markets, and community gatherings throughout the year."
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default OurTown;
