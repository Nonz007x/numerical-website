export async function get(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Fetch failed.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getApi(url: string) {
  try {
    const response = await fetch('http://localhost:1987' + url);

    if (!response.ok) {
      throw new Error('Fetch failed.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function post(url: string, data: object): Promise<void> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('Post failed. Status code:', response.status);
      throw new Error('Post failed.');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

