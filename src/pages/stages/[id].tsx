import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface ConsulterOffreStagePageProps {
  offreStage: {
    titre: string,
    description: string
  };
}

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
export default function ConsulterOffreStagePage(props: ConsulterOffreStagePageProps) {
  const { offreStage } = props;
  const router = useRouter();
  const changeValueAfterThreeSeconds= async () => {
    const value = 'toto';
    await sleep(3000);
    const { id } = router.query;
    const result = await axios.get('http://localhost:1337/api/stages/'+id,
      {
        headers: {
          Authorization: 'Bearer f9d44151c61ad5972fa704e63f3ffc24e368691f7df5deeb1cd0d76157d2c423e329eaa3ffa32766dadb20ce0706742787d06262af618f1f8a5aec39ce4972a92f908c80944381446ba4e0c068983ff1debf54030b90fee1a935c6106176a0ea2fcf31b9c00824485454c6274690c1a44f4b5715ee22a9588ce1333fc786630d',

        },
      });
    setStage(JSON.stringify(result.data));
  };
        
  const [stage, setStage] = useState('titi');
  //if (!offreStage) return null;
  useEffect( ()=>{
    changeValueAfterThreeSeconds();
    // const id = '1';
    // sleep(3000).then(()=>setStage('toto'));
    //
    // axios.get('http://yesno.wtf/api');
    // axios
    //   .get(`https://localhost:1337/api/stages/${id}`,{
    //     headers:
    //           {
    //             AccessControlAllowOrigin:'*',
    //             Authorization: 'Bearer 74d5b85b6fd375997e178f994bea30beadd278b951b732102f4a0b5cf105af9777c14fb11e04e65f99174e9f35501bbf18bc7981a3d65a8cf7f872d5993ad0515e4345870729d50d2767d7972c2f22981aeebc512ee644721564e099bbb5056810a5be98bd9528b26e6d73a1ae6c23de952666367691e38885465883ef54a42c',
    //           },
    //   })
    //   .then((data) => setStage(data));
  });

  return (
    <>

      <div>
        { stage }

      </div>
    </>
  );
}

