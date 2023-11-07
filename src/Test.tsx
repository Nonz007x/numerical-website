import * as fetchX from './tools/fetchX'
import { useEffect, useState } from 'react';
import { Method } from './function/utils';

type inputData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function Test() {
  const [studentData, setStudentData] = useState<inputData>();

  useEffect(() => {

  }, []);

  const handleSubmit = () => {
    const data = {
      name: Method.LINEAR_EQUATION,
      jsonData: {a: '100', b: '0'}
    };

    fetchX.post('http://localhost:1987/get/archive', {name: Method.ROOT_OF_EQUATION}).then(e => {
      console.log(e);
    })
  }

  return (
    <>
      <div>Test</div>
      {studentData?.title}
      <button onClick={handleSubmit}>aaaaaa</button>
    </>
  )
}

export default Test