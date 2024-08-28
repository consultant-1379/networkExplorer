 Setup docker machine (Windows 7)

 To create a docker machine with enough space to create your containers, you need to remove the default machine which
 only has 25GB of space:

 docker-machine rm default

 Then create the new machine:

 docker-machine create -d virtualbox --virtualbox-disk-size "40000" --virtualbox-cpu-count "2" --virtualbox-memory "4096" --engine-storage-driver overlay2 default