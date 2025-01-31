'use client'
import {useEffect, useState} from "react";
import {lockssServices} from "@/config/lockss-services";

export const ServiceStatus = (props: { svcName: string }) => {
  const [svcStatus, setSvcStatus] =
      useState({serviceName: '', ready: false})

  useEffect(() => {
    fetch(`/api/status/${props.svcName}`)
        .then(response => response.json())
        .then(json => setSvcStatus(json))
  }, [props]);

  return (
      <td>
        <div className={`badge ${svcStatus.ready ? 'badge-success' : 'badge-error'}`}></div>
      </td>
  );
}

export const ServiceStatusTable = (props: {}) => {
  return (
      <div className="overflow-x-auto">
        <table className="table">
          <tbody>
          {lockssServices.services.map((svc, i) => (
              <tr key={i}>
                <td>{svc.svcDesc}</td>
                {ServiceStatus(svc)}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  )
}
