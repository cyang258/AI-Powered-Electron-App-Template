import { useEffect, useState } from 'react'
import './LandingPage.css'
import { Alert, SkeletonText, Spinner } from '@chakra-ui/react';
import { toaster } from '../components/toaster';


function LandingPage({ isLoading, error, msg }: { isLoading: boolean; error: string; msg: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if(error && error !== "") {
      toaster.create({
        description: "File saved successfully",
        duration: 6000,
      })
    }
  }, [error])

  return isLoading ? (
    <>
      <Alert.Root
        borderStartWidth="3px"
        borderStartColor="colorPalette.600"
        title="Initializing AI Model"
      >
        <Alert.Indicator>
          <Spinner size="sm" />
        </Alert.Indicator>
        <Alert.Title>{msg}</Alert.Title>
      </Alert.Root>
      <SkeletonText noOfLines={3} gap="4" />
    </>
  ) : (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default LandingPage
