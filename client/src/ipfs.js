import axios from 'axios';

// Replace with your actual Pinata keys
const pinataApiKey = '85344176118c5420f2cc';
const pinataSecretApiKey = '8ed5e19ee28567a9554eaed6e04617361e20d77777ee210a3346546e2c56b942';

const ipfs = {
  // We nest 'add' inside 'files' so RegisterBuyer.js (ipfs.files.add) works
  files: {
    add: async (buffer, callback) => {
      try {
        const formData = new FormData();
        const blob = new Blob([buffer]);
        formData.append('file', blob);

        const response = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          formData,
          {
            maxBodyLength: 'Infinity',
            headers: {
              'pinata_api_key': pinataApiKey,
              'pinata_secret_api_key': pinataSecretApiKey,
            }
          }
        );

        const result = [{ hash: response.data.IpfsHash }];
        
        // Execute the callback if it was provided (matching legacy ipfs-api style)
        if (callback) {
          callback(null, result);
        }
        return result;
      } catch (error) {
        if (callback) {
          callback(error, null);
        }
        throw error;
      }
    }
  }
};

export default ipfs;