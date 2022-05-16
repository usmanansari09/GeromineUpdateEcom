export function getS3Image(path) {
  const S3_PATH = 'https://gero-staging.s3.ap-southeast-1.amazonaws.com';
  if (!path) throw Error('Path not specified');
  return `${S3_PATH}/${path}`;
  // return `${S3_PATH}/profiles/${userId}/images/${path}`;
}
