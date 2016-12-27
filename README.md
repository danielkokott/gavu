# gavu

Use `npm link` where in code directory to add module to global.

# TODO

* gavu init til at læse fra ENV hvis de findes for at lave config
* gavu add til at lave en liste over filer der skal uploades
* gavu status til at lave en oversigt over filer der er uploaded, skal uploades, ikke er "added" eller ikke er downloaded
* gavu push skal uploade alle filer der er "added"
* gavu fetch skal finde afsluttede jobs med Action=InventoryRetrieval og downloade inventory
* gavu pull skal downloade en eller flere filer
* tjek checksum ved download

Lav den eventuelt sådan at programmet venter på at jobs melder tilbage via SNS og så downloader filerne automatisk

# Commands

## init

Initialize vault


## fetch

Download vault inventory


## status

Compare with vault inventory


## add

Add files to upload


## push

Upload added files to vault


## pull

Download files from vault

## jobs

View active jobs

# Glacier data output examples

## listVaults

{
  VaultList: [
    {
      VaultARN: 'arn:aws:glacier:eu-west-1:622824714146:vaults/Photos',
      VaultName: 'Photos',
      CreationDate: '2014-06-28T07:39:32.915Z',
      LastInventoryDate: null,
      NumberOfArchives: 0,
      SizeInBytes: 0
    },
    {
      VaultARN: 'arn:aws:glacier:eu-west-1:622824714146:vaults/TestPhotos',
      VaultName: 'TestPhotos',
      CreationDate: '2016-11-27T15:22:49.881Z',
      LastInventoryDate: '2016-11-28T04:11:37.693Z',
      NumberOfArchives: 1,
      SizeInBytes: 2783065
    }
  ],
  Marker: null
}

## uploadArchive

{
  location: '/622824714146/vaults/TestPhotos/archives/scGlBBfgo08FgerK387BWpIe_SQ4y0sEk2q9y6aSnZbM3MthdvnUkHTHhSuRjgtigesiEnMYWM7pyIq5-WmqwKOcG4wVM-jWvGhBZGQypWinIzK27e8hMi9H9HO_y1WKSnDbo31ZOQ',
  checksum: '34eb791ca2c85793319a11896a790003c9278ce363efc39dcae7e5983ef55694',
  archiveId: 'scGlBBfgo08FgerK387BWpIe_SQ4y0sEk2q9y6aSnZbM3MthdvnUkHTHhSuRjgtigesiEnMYWM7pyIq5-WmqwKOcG4wVM-jWvGhBZGQypWinIzK27e8hMi9H9HO_y1WKSnDbo31ZOQ'
}


## initiateJob

{
  location: '/622824714146/vaults/TestPhotos/jobs/r3zaiU54d_p0izvDbQh1PnnIuCXpu9tZr3Ka1BqUmsfgb99NyoAWQfK3WntFQQPgTfVjAzUNHSd4WMEC5b9oOv41crdq',
  jobId: 'r3zaiU54d_p0izvDbQh1PnnIuCXpu9tZr3Ka1BqUmsfgb99NyoAWQfK3WntFQQPgTfVjAzUNHSd4WMEC5b9oOv41crdq'
}


## listJobs

{
  JobList: [
    {
      JobId: 'r3zaiU54d_p0izvDbQh1PnnIuCXpu9tZr3Ka1BqUmsfgb99NyoAWQfK3WntFQQPgTfVjAzUNHSd4WMEC5b9oOv41crdq',
      JobDescription: 'Retrieving the inventory',
      Action: 'InventoryRetrieval',
      ArchiveId: null,
      VaultARN: 'arn:aws:glacier:eu-west-1:622824714146:vaults/TestPhotos',
      CreationDate: '2016-12-25T22:22:41.423Z',
      Completed: true,
      StatusCode: 'Succeeded',
      StatusMessage: 'Succeeded',
      ArchiveSizeInBytes: null,
      InventorySizeInBytes: 462,
      SNSTopic: null,
      CompletionDate: '2016-12-26T02:39:44.113Z',
      SHA256TreeHash: null,
      ArchiveSHA256TreeHash: null,
      RetrievalByteRange: null,
      Tier: null,
      InventoryRetrievalParameters: [Object]
    },{
      JobId: 'lByYxgp0ljTt2TOktWMVd0XOKNcuyT0g_gUzsNA4nBbZwLHgv2HlcpBsZMFdnEqOdknbTsDqCqCF53ihfAJ0iYMEjh1F',
      JobDescription: 'Downloading one archive',
      Action: 'ArchiveRetrieval',
      ArchiveId: 'scGlBBfgo08FgerK387BWpIe_SQ4y0sEk2q9y6aSnZbM3MthdvnUkHTHhSuRjgtigesiEnMYWM7pyIq5-WmqwKOcG4wVM-jWvGhBZGQypWinIzK27e8hMi9H9HO_y1WKSnDbo31ZOQ',
      VaultARN: 'arn:aws:glacier:eu-west-1:622824714146:vaults/TestPhotos',
      CreationDate: '2016-12-26T09:50:55.680Z',
      Completed: true,
      StatusCode: 'Succeeded',
      StatusMessage: 'Succeeded',
      ArchiveSizeInBytes: 2750297,
      InventorySizeInBytes: null,
      SNSTopic: null,
      CompletionDate: '2016-12-26T14:04:59.837Z',
      SHA256TreeHash: '34eb791ca2c85793319a11896a790003c9278ce363efc39dcae7e5983ef55694',
      ArchiveSHA256TreeHash: '34eb791ca2c85793319a11896a790003c9278ce363efc39dcae7e5983ef55694',
      RetrievalByteRange: '0-2750296',
      Tier: 'Standard'
    }
  ],
  Marker: null
}


## getJobOutput

{
  checksum: '34eb791ca2c85793319a11896a790003c9278ce363efc39dcae7e5983ef55694',
  status: 200,
  acceptRanges: 'bytes',
  contentType: 'application/octet-stream',
  archiveDescription: '2006-10/DSCF3481.JPG',
  body: <Buffer ff d8 ff e1 1d 72 45 78 69 66 00 00 4d 4d 00 2a 00 00 00 08 00 0d 01 0f 00 02 00 00 00 09 00 00 00 aa 01 10 00 02 00 00 00 10 00 00 00 b4 01 12 00 03 ... >
}


## Inventory

{
  VaultARN: 'arn:aws:glacier:eu-west-1:622824714146:vaults/TestPhotos',
  InventoryDate: '2016-11-28T03:35:02Z',
  ArchiveList: [
  {
    ArchiveId: 'scGlBBfgo08FgerK387BWpIe_SQ4y0sEk2q9y6aSnZbM3MthdvnUkHTHhSuRjgtigesiEnMYWM7pyIq5-WmqwKOcG4wVM-jWvGhBZGQypWinIzK27e8hMi9H9HO_y1WKSnDbo31ZOQ',
    ArchiveDescription: '2006-10/DSCF3481.JPG',
    CreationDate: '2016-11-27T15:41:44Z',
    Size: 2750297,
    SHA256TreeHash: '34eb791ca2c85793319a11896a790003c9278ce363efc39dcae7e5983ef55694'
  }]
}
