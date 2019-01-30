package it.akademija.users.service;

import it.akademija.documents.repository.DocumentEntity;
import it.akademija.documents.repository.DocumentRepository;
import it.akademija.documents.repository.DocumentTypeEntity;
import it.akademija.documents.repository.DocumentTypeRepository;
import it.akademija.users.repository.UserGroupEntity;
import it.akademija.users.repository.UserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class UserGroupService {

    @Autowired
    private UserGroupRepository userGroupRepository;

    @Autowired
    private DocumentTypeRepository documentTypeRepository;

    @Autowired
    private DocumentRepository documentRepository;

    public UserGroupService(UserGroupRepository userGroupRepository, DocumentTypeRepository documentTypeRepository,
                            DocumentRepository documentRepository) {
        this.userGroupRepository = userGroupRepository;
        this.documentTypeRepository=documentTypeRepository;
        this.documentRepository=documentRepository;
    }


    public UserGroupRepository getUserGroupRepository() {
        return userGroupRepository;
    }

    public void setUserGroupRepository(UserGroupRepository userGroupRepository) {
        this.userGroupRepository = userGroupRepository;
    }


    @Transactional
    public void addNewUserGroup(UserGroupServiceObject userGroupServiceObject) {
        UserGroupEntity userGroupEntity = new UserGroupEntity(userGroupServiceObject.getTitle());
        UserGroupEntity userGroupEntityFromDataBase = userGroupRepository.findGroupByTitle(userGroupServiceObject.getTitle());
        if (userGroupEntityFromDataBase == null) {
            userGroupRepository.save(userGroupEntity);
        }
    }

    @Transactional
    public UserGroupServiceObject getGroupByTitle(String title) {
        UserGroupEntity userGroupEntity = userGroupRepository.findGroupByTitle(title);
        if (userGroupEntity != null) {
            UserGroupServiceObject userGroupServiceObject = new UserGroupServiceObject(userGroupEntity.getTitle());
            return userGroupServiceObject;
        }
        return null;
    }

    @Transactional
    public Collection<UserGroupServiceObject> getAllGroups() {
        return userGroupRepository.
                findAll()
                .stream()
                .map(userGroupEntity -> new UserGroupServiceObject(userGroupEntity.getTitle()))
                .collect(Collectors.toList());
    }

    @Transactional
    @Modifying
    public void deleteGroupByTitle(String title) {
        userGroupRepository.deleteGroupByTitle(title);
    }

    @Transactional
    public void updateGroupByTitle(String title) {
        UserGroupEntity savedUserGroupEntity=userGroupRepository.findGroupByTitle(title);
        savedUserGroupEntity.setTitle(title);
        UserGroupEntity updateUserGroupEntit=userGroupRepository.save(savedUserGroupEntity);
    }

    @Transactional
    public void addDocumentTypeToUpload(String userGroupTitle, String documentTypeTitle) {
        UserGroupEntity userGroupEntity = userGroupRepository.findGroupByTitle(userGroupTitle);
        DocumentTypeEntity documentTypeEntity = documentTypeRepository.findDocumentTypeByTitle(documentTypeTitle);
        if (userGroupEntity!=null && documentTypeEntity!=null) {
            userGroupEntity.addAvailableDocumentTypeToUpload(documentTypeEntity);
        }


    }

    @Transactional
    public void addDocumentTypeToApprove(String userGroupTitle, String documentTypeTitle) {
        UserGroupEntity userGroupEntity = userGroupRepository.findGroupByTitle(userGroupTitle);
        DocumentTypeEntity documentTypeEntity = documentTypeRepository.findDocumentTypeByTitle(documentTypeTitle);
        if (userGroupEntity!=null && documentTypeEntity!=null) {
            userGroupEntity.addAvailableDocumentTypeToApprove(documentTypeEntity);
        }


    }

    @Transactional
    public void addDocumentsToApprove(String userGroupTitle, String documentIdentifier) {
        UserGroupEntity userGroupEntity = userGroupRepository.findGroupByTitle(userGroupTitle);
        DocumentEntity documentEntity = documentRepository.findDocumentByDocumentIdentifier(documentIdentifier);
        if (userGroupEntity!=null && documentEntity!=null) {
            userGroupEntity.addDocumentsToApprove(documentEntity);
        }


    }







}



