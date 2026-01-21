// services/instagramService.js
import { instagramApi } from "./api";

// /**
//  * Service untuk mengambil media dari Instagram Graph API.
//  * @param {string} userId - Instagram User ID dari environment variable
//  * @param {string} accessToken - Access Token dari environment variable
//  * @param {string} fields - Fields yang diminta (default sesuai kebutuhan)
//  * @returns {Promise} - Data response dari API
//  */

export async function fetchInstagramMedia(
  userId,
  accessToken,
  fields = "id,caption,media_type,media_url,permalink,timestamp",
) {
  try {
    const response = await instagramApi.get(`/${userId}/media`, {
      params: {
        fields,
        access_token: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Instagram Service Error:",
      error.response?.data || error.message,
    );
    throw new Error(`Gagal mengambil feed Instagram: ${error.message}`);
  }
}
