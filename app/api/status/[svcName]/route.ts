import {readFileSync} from 'node:fs'
import {getProperties} from 'properties-file'

export async function GET(request: Request,
                          {params}: { params: Promise<{ svcName: string }> }) {

  const {svcName} = await params;

  const clusterCfg = getProperties(readFileSync('/run/configs/lockss_cluster'));
  const PROPS_SERVICE_BINDINGS_KEY = "org.lockss.app.serviceBindings"

  const bindings = parseServiceBindings(clusterCfg[PROPS_SERVICE_BINDINGS_KEY]);

  function parseServiceBindings(prop: string): { [key: string]: string[] } {
    const svcs: { [key: string]: string[] } = {};

    for (const serviceBinding of prop.split(';')) {
      if (serviceBinding.trim() === '') continue;
      const parts = serviceBinding.split('=');
      if (parts.length < 2) continue;
      const key = parts[0];
      const value = parts[1].split(",");
      svcs[key] = value;
    }

    return svcs;
  }

  const res =
      fetch(`http://` + bindings[svcName][0] + `/status`, {
        cache: "no-cache",
        headers: {
          'Content-Type': 'application/json',
          'API-Key': process.env.DATA_API_KEY!,
        },
      });

  const result = await res.then((response) => {
    if (!response.ok) {
      // REST service responded but with a non-200 error
      return [];
    }

    // Pass-through REST response
    return response.json();
  }).catch((e) => {
    // Client errors e.g., because of a connect timeout, etc.
    return e.cause;
  });

  return Response.json(result)
}
