import { useCallback, useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios"

import { Api, ApiCard } from "../../components/ApiCard";
import { Header } from "../../components/Header";

import './styles.css'

const ApiNames = [
  'accounts', 
  'assets', 
  'customers',
  'datapoints',
  'devices',
  'documents',
  'forms',
  'invites',
  'media',
  'messages',
  'namespaces', 
  'orders', 
  'patients', 
  'relationships', 
  'rules',
  'templates', 
  'users', 
  'workflows',
]

export function Home() {
  const fetchAPIUseEffect = useRef(true)

  const [apiStatusResult, setApiStatusResults] = useState<Api[]>([])

  const selectedTimeToReCheckServiceStatus = 15 * 1000 // 15 sec

  const reCheckApiStatus = useCallback(async () => {
    const updatedResults = await Promise.all(
      ApiNames.map(async (apiName) => {
        try {
          const { data } = await axios<Api>({
            method: 'get',
            url: `https://api.factoryfour.com/${apiName}/health/status`,
            timeout: selectedTimeToReCheckServiceStatus
          });
  
          return {
            name: apiName,
            hostname: data.hostname,
            success: data.success,
            time: data.time,
            message: data.message
          };
        } catch (ex) {
          const error = ex as AxiosError;
  
          return {
            name: apiName,
            hostname: '',
            success: false,
            time: 0,
            message: error.message
          };
        }
      })
    );
  
    setApiStatusResults(updatedResults);
  }, [selectedTimeToReCheckServiceStatus, setApiStatusResults]);
  

  useEffect(() => {
    if (fetchAPIUseEffect.current) {
      fetchAPIUseEffect.current = false
      reCheckApiStatus()
    }

    const intervalRef = setInterval(() => {
      reCheckApiStatus();
    }, selectedTimeToReCheckServiceStatus);

    return () => {
      clearInterval(intervalRef);
    };
  }, [selectedTimeToReCheckServiceStatus, reCheckApiStatus]);

  return (
    <div className="home-container">
      <Header /> 

      <div className="home-content">
        {
          apiStatusResult.map(api => {
            return (
              <ApiCard 
                key={api.name}
                hostname={api.hostname}
                message={api.message}
                name={api.name}
                success={api.success}
                time={api.time}
              />
            )
          })
        }
      </div>
    </div>
  )
}