export const loadGoogleMapsApi = (apiKey?: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!apiKey) {
      const error = new Error('No API key provided.')
      reject(error)
      return
    }

    if (document.getElementById('google-maps-script')) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.id = 'google-maps-script'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places,marker&v=weekly&loading=async`
    script.async = true
    script.defer = true

    script.onload = () => resolve()
    script.onerror = error => reject(error)

    document.head.appendChild(script)
  })
