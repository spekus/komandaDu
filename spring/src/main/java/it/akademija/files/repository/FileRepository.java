package it.akademija.files.repository;

import lombok.val;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
    FileEntity getFileByIdentifier(String identifier);

}
