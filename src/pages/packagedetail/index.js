/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useRouter } from '../../util/router';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import AlternateSection from '../../components/AlternateSection';
import { BACKEND_URL, ENDPOINT, PRODUCT_TYPE } from '../../data/constants';
import { formatPrice } from '../../util/display';

const ITINERARY = 'Itinerary';
const INCLUSIONS = 'Inclusions';
const EXCLUSIONS = 'Exclusions';
const TNC = 'Terms and Conditions';

const PackageDetailPage = props => {
  const { id, date } = props.location.state;

  const router = useRouter();

  const [packageInfo, setPackageInfo] = useState({});
  const [activeTab, setActiveTab] = useState(ITINERARY);
  const [flightInfo, setFlightInfo] = useState({});
  const [flightInfoReturn, setFlightInfoReturn] = useState({});
  const [hotelInfo, setHotelInfo] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function fetchData() {
    setIsError(false);
    setIsLoading(true);
    const res = await fetch(
      `${BACKEND_URL}${ENDPOINT.GET_PACKAGE_DETAIL}?id=${id}&startDate=${date}`,
    );
    res
      .json()
      .then(r => {
        const {
          package: packageData,
          flightDetail: flightData,
          flightDetaiReturn: flightDataReturn,
          hotelDetail: hotelData,
        } = r.data;
        setPackageInfo({
          city: packageData.city,
          description: packageData.description,
          durationDays: packageData.duration_days,
          durationNights: packageData.duration_nights,
          packageId: packageData.id,
          name: packageData.name,
          price: packageData.price,
          rate: packageData.rate,
          startDate: packageData.startDate,
        });
        setFlightInfo({
          airline: flightData.airline,
          departureCity: flightData.departureCity,
          departureTime: flightData.departureTime,
          departureAirportCode: flightData.departureAirportCode,
          arrivalCity: flightData.arrivalCity,
          arrivalTime: flightData.arrivalTime,
          arrivalAirportCode: flightData.arrivalAirportCode,
          price: flightData.price,
          startDate: flightData.startDate,
        });
        setFlightInfoReturn({
          airline: flightDataReturn.airline,
          departureCity: flightDataReturn.departureCity,
          departureTime: flightDataReturn.departureTime,
          departureAirportCode: flightDataReturn.departureAirportCode,
          arrivalCity: flightDataReturn.arrivalCity,
          arrivalTime: flightDataReturn.arrivalTime,
          arrivalAirportCode: flightDataReturn.arrivalAirportCode,
          price: flightDataReturn.price,
          startDate: flightDataReturn.startDate,
        });
        setHotelInfo({
          address: hotelData.address,
          city: hotelData.city,
          hotelName: hotelData.hotelName,
          price: hotelData.price,
          rate: hotelData.rate,
          roomType: hotelData.roomType,
          startDate: packageData.startDate,
          endDate: packageData.startDate,
        });
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const select = () => {
    router.push({
      pathname: '/orderdetail',
      state: {
        type: PRODUCT_TYPE.PACKAGES,
        info: { packageInfo, flightInfo, flightInfoReturn, hotelInfo },
      },
    });
  };

  const packageStar = () => {
    const stars = [...Array(parseInt(packageInfo.rate, 10))].map(() => (
      <i className="fas fa-star has-text-warning" />
    ));
    return <div>{stars}</div>;
  };

  const packageSummaryView = () => {
    const { city, description, durationDays, durationNights, name, price, startDate } = packageInfo;
    return (
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src={`https://ui-avatars.com/api/?name=${name.split(' ').join('+')}`}
                  alt="Package avatar"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{name}</p>
              <p className="subtitle is-6">{`${city} | ${startDate} | 2 Tamu, 1 Kamar`}</p>
            </div>
          </div>
        </div>
        <div className="card-image">
          <figure className="image is-3by1">
            <img src="https://source.unsplash.com/720x240/?travel,nature" alt="package" />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <div className="columns">
              <div className="column">
                <div className="has-text-weight-bold">{`${durationDays} day(s), ${durationNights} night(s)`}</div>
                <div>{description}</div>
                <div>{packageStar()}</div>
              </div>
              <div className="column is-narrow">
                <div className="is-size-4 has-text-weight-bold">{formatPrice(price)}</div>
                <button
                  type="submit"
                  className="button is-info FlightSearchCard__select-button"
                  onClick={select}
                >
                  <span className="icon">
                    <i className="fas fa-check" />
                  </span>
                  <span>Select</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const itineraryView = () => (
    <div>
      <p>
        Hari ke-1 Tiba di Tujuan
        <br />
        Saat yang Anda tunggu-tunggu telah tiba! Anda berdua akan tiba di Airport Tujuan. Setelah
        selesai dengan proses imigrasi (visa on arrival) dan baggage custom, Anda dapat langsung
        melanjutkan perjalanan menuju Resort. Setibanya di Resort, Anda dapat langsung melakukan
        proses check-in dan beristirahat, Anda dapat menikmati makan malam dan bersantai di Bar di
        Club Resort kami.
        <br />
        <br />
        Hari ke-2 Nikmati Awal Perjalanan di Tujuan Pertama
        <br />
        Pagi hari, Anda berdua dapat benar-benar menikmati keindahan suasana di tujuan pertama.
        Habiskan waktu berdua dengan berkeliling menjelajahi resort dengan terpaan sinar matahari
        pagi. Setelah itu Anda dapat menikmati makan pagi dengan berjalan kaki menuju restaurant,
        pilihlah tempat duduk yang terbaik untuk menikmati pemandangan laut yang indah. Setelah
        makan pagi, Anda bebas melakukan kegiatan berdua di area resort yang telah menyiapkan banyak
        fasilitas seperti swimming pool, serta kegiatan yang ada di dalam resort hingga menikmati
        makanan dan minuman di bar dan restoran. Di sore hari Anda dapat menikmati evening show yang
        biasa disediakan oleh pihak resort untuk menghibur atau Anda juga dapat pergi ke bar untuk
        menikmati minuman yang tersedia secara free flow dan memandang panorama sunset yang sangat
        indah. Nikmati Makan malam Anda berdua dan kembali ke kamar Anda.
        <br />
        <br />
        Hari ke-3 Kenikmatan Pemandangan di Tujuan Kedua
        <br />
        Hari ini setelah menikmati makan pagi, Anda berdua dapat mengeksplorasi keindahan
        pemandangan yang eksotis bersama pasangan dengan breakfast romantis di bawah sinar sejuk
        matahari. Anda dapat menikmati waktu-waktu berdua dimana Anda dapat bergabung dengan program
        reflexology yang tenang dengan aromaterapi yang wangi menyejukkan. Malam hari Anda dapat
        menikmati dinner di Dining Restaurant dengan menu seperti lobster dan champange dengan mutu
        terbaik.
        <br />
        <br />
        Hari ke-4 Pelajaran berharga bersama pasangan
        <br />
        Hari ini khusus untuk Anda dan pasangan akan diajak untuk memulai cooking school agar dapat
        mulai belajar cara memasak dan menyenangkan pasangan dengan masakan Anda yang paling enak.
        Fasilitas belajar memasak yang baik mendukung keahlian kerjasama Anda berdua dalam
        mempersiapkan masakan Anda. Dengan memetik bahan masakan sendiri, Anda berdua akan menikmati
        pengalaman yang berharga yang akan Anda hadapi seumur hidup.
        <br />
        <br />
        Hari ke-5 Hari terakhir, tapi bukan akhir segalanya
        <br />
        Di hari terakhir, Anda berdua bisa mulai berkemas dengan tenang dan rileks sambil menonton
        saluran TV cable dengan LCD TV yang tersedia di setiap kamar atau Anda juga bisa mengakses
        internet dengan free wi-fi yang disediakan. Setelah makan pagi Anda bisa menitipkan barang
        luggage Anda di counter hotel. Setelah itu Anda tetap dapat menikmati fasilitas di resort
        dan menikmati waktu-waktu Anda sambil menikmati segala keindahan alamnya. Anda juga bisa
        mengunjungi gift shop untuk membeli oleh-oleh untuk keluarga atau kerabat. Setelah tiba
        waktunya check-out, Anda dapat menuju bandara untuk melanjutkan perjalanan kembali ke tanah
        air.
      </p>
    </div>
  );
  const inclusionsView = () => {
    return (
      <ul>
        <li>
          1. Biaya sudah termasuk paket pesawat, hotel dan fasilitas bulan madu di tempat tujuan.
        </li>
        <li>2. Paket pesawat dengan kelas terbaik dari Garuda Indonesia Airlines.</li>
        <li>
          3. Paket hotel berbintang dengan fasilitas unlimited bar, aktivitas olahraga, dan
          aktivitas reflexology.
        </li>
        <li>4. Hiburan malam yang unik dan penuh romantis.</li>
        <li>
          5. Paket bulan madu dengan dekorasi kamar yang menarik, tersedia bottle of wine, prioritas
          check in dan check out dengan pelayanan hotel terbaik.
        </li>
      </ul>
    );
  };
  const exclusionsView = () => (
    <ul>
      <li>1. Tidak termasuk pengeluaran pribadi Anda termasuk pembelian oleh-oleh.</li>
      <li>2. Perjalanan menuju ke/dari bandara/resort tidak disediakan.</li>
    </ul>
  );
  const tncView = () => (
    <div>
      <ul>
        <li>
          1. Hanya untuk Warga Negara yang memiliki tanda pengenal seperti KTP, SIM,atau Paspor yang
          valid.
        </li>
        <li>
          2. Ketentuan waktu check-in hotel pada pukul 13.00 dan waktu check-out pada pukul 12:00.
        </li>
        <li>3. Keterlambatan penerbangan adalah tanggungan pribadi.</li>
      </ul>
    </div>
  );

  const detailTabView = () => {
    return (
      <div className="card">
        <div className="card-content">
          <div className="tabs is-boxed">
            <ul>
              <li className={activeTab === ITINERARY && 'is-active'}>
                <a onClick={() => setActiveTab(ITINERARY)}>
                  <span className="icon is-small">
                    <i className="far fa-flag" />
                  </span>
                  <span>{ITINERARY}</span>
                </a>
              </li>
              <li className={activeTab === INCLUSIONS && 'is-active'}>
                <a onClick={() => setActiveTab(INCLUSIONS)}>
                  <span className="icon is-small">
                    <i className="fas fa-sign-in-alt" />
                  </span>
                  <span>{INCLUSIONS}</span>
                </a>
              </li>
              <li className={activeTab === EXCLUSIONS && 'is-active'}>
                <a onClick={() => setActiveTab(EXCLUSIONS)}>
                  <span className="icon is-small">
                    <i className="fas fa-sign-out-alt" />
                  </span>
                  <span>{EXCLUSIONS}</span>
                </a>
              </li>
              <li className={activeTab === TNC && 'is-active'}>
                <a onClick={() => setActiveTab(TNC)}>
                  <span className="icon is-small">
                    <i className="fas fa-tasks" />
                  </span>
                  <span>{TNC}</span>
                </a>
              </li>
            </ul>
          </div>

          {activeTab === ITINERARY && itineraryView()}
          {activeTab === INCLUSIONS && inclusionsView()}
          {activeTab === EXCLUSIONS && exclusionsView()}
          {activeTab === TNC && tncView()}
        </div>
      </div>
    );
  };

  const showContent = () => {
    if (isError) {
      return <AlternateSection error />;
    }

    if (isLoading) {
      return <AlternateSection loading />;
    }

    return (
      <div>
        {packageSummaryView()}
        {detailTabView()}
      </div>
    );
  };

  return (
    <Section>
      <div className="container">
        <SectionHeader title="Package Detail" size={2} />
        {showContent()}
      </div>
    </Section>
  );
};

export default PackageDetailPage;
